import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User.js'
import { requireAuth, signToken } from '../../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res)=>{
  const admins = await User.find({ role: 'admin' }).select('-passwordHash')
  res.json(admins)
})

router.get('/:id', async (req, res)=>{
  const admin = await User.findById(req.params.id).select('-passwordHash')
  if(!admin) return res.status(404).json({ error: 'Not found' })
  res.json(admin)
})

// Restrict admin account to a single configured email
router.post('/', async (req, res)=>{
  const { name, email, password } = req.body
  const exists = await User.findOne({ email })
  if(exists) return res.status(400).json({ error: 'Email exists' })
  const passwordHash = await bcrypt.hash(password || 'admin123A', 10)
  const user = await User.create({ name: name || 'Admin', email, passwordHash, role: 'admin' })
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
  console.log('Admin login attempt', { email })
  const user = await User.findOne({ email, role: 'admin' })
  if(!user) {
    console.log('Admin user not found')
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  console.log('Admin user found', { id: user._id, email: user.email, role: user.role })
  const ok = await bcrypt.compare(password || '', user.passwordHash)
  if(!ok) {
    console.log('Password mismatch')
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = signToken(user)
  console.log('Admin login successful', { token: token.substring(0, 20) + '...' })
  res.json({ token })
})

export default router


