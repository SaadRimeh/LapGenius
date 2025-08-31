import { Router } from 'express'
import mongoose from 'mongoose'

const cancelSchema = new mongoose.Schema({ order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, reason: String, status: { type: String, enum: ['requested','approved','rejected'], default: 'requested' } }, { timestamps: true })
const Cancel = mongoose.model('Cancel', cancelSchema)

const router = Router()

router.get('/', async (_req, res)=>{ res.json(await Cancel.find().sort({ createdAt: -1 })) })
router.post('/', async (req, res)=>{ const doc = await Cancel.create(req.body); res.status(201).json(doc) })
router.put('/:id', async (req, res)=>{ const doc = await Cancel.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!doc) return res.status(404).json({ error: 'Not found' }); res.json(doc) })
router.delete('/:id', async (req, res)=>{ await Cancel.findByIdAndDelete(req.params.id); res.status(204).end() })

export default router


