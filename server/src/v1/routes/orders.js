import { Router } from 'express'
import Order from '../../models/Order.js'
import Laptop from '../../models/Laptop.js'
import { requireAuth, requireRole } from '../../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res)=>{
  const rows = await Order.find().populate('client').populate('items.laptop').sort({ createdAt: -1 })
  res.json(rows)
})

router.get('/:id', async (req, res)=>{
  const row = await Order.findById(req.params.id).populate('client').populate('items.laptop')
  if(!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.post('/', async (req, res)=>{
  const { client, items } = req.body
  let total = 0
  const enriched = []
  for(const it of items){
    const laptop = await Laptop.findById(it.laptop)
    if(!laptop) return res.status(400).json({ error: 'Invalid laptop' })
    const priceAtPurchase = laptop.price
    total += priceAtPurchase * (it.quantity || 1)
    enriched.push({ laptop: laptop._id, quantity: it.quantity || 1, priceAtPurchase })
  }
  const order = await Order.create({ client, items: enriched, total })
  res.status(201).json(order)
})

router.put('/:id', requireAuth, /* requireRole('admin'), */ async (req, res)=>{
  console.log('=== ORDER UPDATE REQUEST ===')
  console.log('Order ID:', req.params.id)
  console.log('User:', req.user)
  console.log('Body:', req.body)
  console.log('Headers:', req.headers.authorization ? 'Authorization present' : 'No Authorization')
  
  // Manual role check
  if(req.user.role !== 'admin') {
    console.log('Role check failed:', req.user.role)
    return res.status(403).json({ error: 'Forbidden - Admin role required' })
  }
  
  try{
    const doc = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!doc) {
      console.log('Order not found')
      return res.status(404).json({ error: 'Not found' })
    }
    console.log('Order updated successfully:', doc._id)
    res.json(doc)
  }catch(e){
    console.error('Order update error:', e)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  await Order.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router


