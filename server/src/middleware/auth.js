import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next){
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  console.log('Auth check', { hasHeader: !!header, hasToken: !!token, headerLength: header.length })
  if(!token) return res.status(401).json({ error: 'Unauthorized' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    console.log('Token payload', payload)
    req.user = payload
    next()
  }catch(e){
    console.error('Token verification failed', e)
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function signToken(user){
  const payload = { id: user._id.toString(), email: user.email, role: user.role }
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
}

export function requireRole(role){
  return function(req, res, next){
    console.log('Role check', { required: role, user: req.user?.email, role: req.user?.role, hasUser: !!req.user })
    if(!req.user) return res.status(401).json({ error: 'Unauthorized' })
    if(req.user.role !== role) return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}


