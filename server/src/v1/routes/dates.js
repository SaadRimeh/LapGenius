import { Router } from 'express'
import mongoose from 'mongoose'

const dateSchema = new mongoose.Schema({ iso: String, note: String }, { timestamps: true })
const D = mongoose.model('DateDemo', dateSchema)

const router = Router()

router.get('/', async (_req, res)=>{ res.json(await D.find().sort({ createdAt: -1 })) })
router.post('/', async (req, res)=>{ const doc = await D.create(req.body); res.status(201).json(doc) })
router.put('/:id', async (req, res)=>{ const doc = await D.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!doc) return res.status(404).json({ error: 'Not found' }); res.json(doc) })
router.delete('/:id', async (req, res)=>{ await D.findByIdAndDelete(req.params.id); res.status(204).end() })

export default router


