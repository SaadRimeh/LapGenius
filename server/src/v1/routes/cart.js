import { Router } from 'express'
import mongoose from 'mongoose'
import Order from '../../models/Order.js'
import Laptop from '../../models/Laptop.js'

const cartSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [{ laptop: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }, quantity: { type: Number, default: 1 } }]
}, { timestamps: true })
const Cart = mongoose.model('Cart', cartSchema)

const router = Router()

router.get('/:clientId', async (req, res)=>{
  const cart = await Cart.findOne({ client: req.params.clientId }).populate('items.laptop')
  res.json(cart || { client: req.params.clientId, items: [] })
})

router.post('/:clientId/add', async (req, res)=>{
  const { laptop_id, quantity = 1 } = req.body
  const laptop = await Laptop.findById(laptop_id)
  if(!laptop) return res.status(400).json({ error: 'Invalid laptop' })
  let cart = await Cart.findOne({ client: req.params.clientId })
  if(!cart) cart = await Cart.create({ client: req.params.clientId, items: [] })
  const existing = cart.items.find(i=> i.laptop.toString() === laptop_id)
  if(existing) existing.quantity += quantity
  else cart.items.push({ laptop: laptop._id, quantity })
  await cart.save()
  res.json(await cart.populate('items.laptop'))
})

router.put('/contain/:itemId', async (req, res)=>{
  const { quantity } = req.body
  const carts = await Cart.find({ 'items._id': req.params.itemId })
  for(const c of carts){
    const it = c.items.id(req.params.itemId)
    if(it){ it.quantity = quantity; await c.save(); return res.json(it) }
  }
  res.status(404).json({ error: 'Not found' })
})

router.delete('/:clientId/item/:itemId', async (req, res)=>{
  const cart = await Cart.findOne({ client: req.params.clientId })
  if(!cart) return res.status(404).json({ error: 'Not found' })
  const it = cart.items.id(req.params.itemId)
  if(!it) return res.status(404).json({ error: 'Not found' })
  it.deleteOne(); await cart.save(); res.status(204).end()
})

router.post('/:clientId/checkout', async (req, res)=>{
  const cart = await Cart.findOne({ client: req.params.clientId }).populate('items.laptop')
  if(!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart empty' })
  let total = 0
  const items = cart.items.map(it=>{ total += it.laptop.price * it.quantity; return { laptop: it.laptop._id, quantity: it.quantity, priceAtPurchase: it.laptop.price } })
  const order = await Order.create({ client: cart.client, items, total })
  cart.items = []; await cart.save()
  res.json(order)
})

export default router


