import { Router } from 'express'
import Suggestion from '../../models/Suggestion.js'

const router = Router()

router.get('/', async (_req, res)=>{
  const rows = await Suggestion.find().sort({ createdAt: -1 })
  res.json(rows)
})

router.get('/:id', async (req, res)=>{
  const row = await Suggestion.findById(req.params.id)
  if(!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.post('/', async (req, res)=>{
  const doc = await Suggestion.create(req.body)
  res.status(201).json(doc)
})

router.put('/:id', async (req, res)=>{
  const doc = await Suggestion.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if(!doc) return res.status(404).json({ error: 'Not found' })
  res.json(doc)
})

router.delete('/:id', async (req, res)=>{
  await Suggestion.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router


