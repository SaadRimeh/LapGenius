import { Router } from 'express'
import Order from '../../models/Order.js'

const router = Router()

// Expose order items as a flat list
router.get('/', async (_req, res)=>{
  const orders = await Order.find().populate('items.laptop')
  const items = orders.flatMap(o=> o.items.map(it=> ({ ...it.toObject(), order: o._id })))
  res.json(items)
})

router.get('/:id', async (req, res)=>{
  const orders = await Order.find({ 'items._id': req.params.id }).populate('items.laptop')
  for(const o of orders){
    const it = o.items.id(req.params.id)
    if(it){ return res.json({ ...it.toObject(), order: o._id }) }
  }
  res.status(404).json({ error: 'Not found' })
})

router.put('/:id', async (req, res)=>{
  const orders = await Order.find({ 'items._id': req.params.id })
  for(const o of orders){
    const it = o.items.id(req.params.id)
    if(it){ Object.assign(it, req.body); await o.save(); return res.json(it) }
  }
  res.status(404).json({ error: 'Not found' })
})

router.delete('/:id', async (req, res)=>{
  const orders = await Order.find({ 'items._id': req.params.id })
  for(const o of orders){
    const it = o.items.id(req.params.id)
    if(it){ it.deleteOne(); await o.save(); return res.status(204).end() }
  }
  res.status(404).json({ error: 'Not found' })
})

export default router


