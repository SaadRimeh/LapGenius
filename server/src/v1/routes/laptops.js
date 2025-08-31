import { Router } from 'express'
import Laptop from '../../models/Laptop.js'
import { requireAuth, requireRole } from '../../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res)=>{
  const rows = await Laptop.find().sort({ createdAt: -1 })
  res.json(rows)
})

router.get('/:id', async (req, res)=>{
  const row = await Laptop.findById(req.params.id)
  if(!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.post('/', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.create(req.body)
  res.status(201).json(doc)
})

router.put('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if(!doc) return res.status(404).json({ error: 'Not found' })
  res.json(doc)
})

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  await Laptop.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router


