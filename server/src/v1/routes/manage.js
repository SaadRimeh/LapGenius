import { Router } from 'express'
import mongoose from 'mongoose'
import { requireAuth, requireRole } from '../../middleware/auth.js'

const settingSchema = new mongoose.Schema({ key: { type: String, unique: true }, value: mongoose.Schema.Types.Mixed }, { timestamps: true })
const Setting = mongoose.model('Setting', settingSchema)

const router = Router()

router.get('/', async (_req, res)=>{
  const rows = await Setting.find().sort({ createdAt: -1 })
  res.json(rows)
})

router.post('/', requireAuth, requireRole('admin'), async (req, res)=>{
  const { key, value } = req.body
  const doc = await Setting.create({ key, value })
  res.status(201).json(doc)
})

router.put('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Setting.findByIdAndUpdate(req.params.id, { value: req.body.value }, { new: true })
  if(!doc) return res.status(404).json({ error: 'Not found' })
  res.json(doc)
})

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  await Setting.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router


