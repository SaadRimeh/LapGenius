import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User.js'
import { signToken, requireAuth } from '../../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res)=>{
  const clients = await User.find({ role: 'client' }).select('-passwordHash')
  res.json(clients)
})

router.get('/:id', async (req, res)=>{
  const client = await User.findById(req.params.id).select('-passwordHash')
  if(!client) return res.status(404).json({ error: 'Not found' })
  res.json(client)
})

router.post('/', async (req, res)=>{
  const { name, email, password } = req.body
  const exists = await User.findOne({ email })
  if(exists) return res.status(400).json({ error: 'Email exists' })
  const passwordHash = await bcrypt.hash(password || 'client123', 10)
  const user = await User.create({ name, email, passwordHash, role: 'client' })
  res.status(201).json({ id: user._id })
})

router.put('/:id', requireAuth, async (req, res)=>{
  const { name, email, password } = req.body
  const update = { name, email }
  if(password) update.passwordHash = await bcrypt.hash(password, 10)
  await User.findByIdAndUpdate(req.params.id, update)
  res.json({ ok: true })
})

router.delete('/:id', requireAuth, async (req, res)=>{
  await User.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

router.post('/login', async (req, res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ email, role: 'client' })
  if(!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password || '', user.passwordHash)
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = signToken(user)
  res.json({ token })
})

export default router


