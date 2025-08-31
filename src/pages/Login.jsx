import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validatePassword } from '../utils/validators.js'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { loginAdmin, loginClient } = useAuth()
  const navigate = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    setError('')
    if(!email) return setError('يرجى إدخال البريد الإلكتروني')
    if(!validateEmail(email)) return setError('البريد الإلكتروني غير صحيح')
    if(!password) return setError('يرجى إدخال كلمة المرور')
    const { isValid, error } = validatePassword(password)
    if(!isValid) return setError('كلمة المرور غير قوية:\n'+error)
    // Try admin login first; if it fails, try client login
    loginAdmin(email, password)
      .then(()=> navigate('/dashboard'))
      .catch(()=>{
        loginClient(email, password)
          .then(()=> navigate('/'))
          .catch(err=> setError(err.message || 'بيانات اعتماد غير صالحة'))
      })
  }
  return (
    <section className="form">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={submit}>
        <label htmlFor="lemail">البريد الإلكتروني</label>
        <input id="lemail" value={email} onChange={e=>setEmail(e.target.value)} />
        <label htmlFor="lpass">كلمة المرور</label>
        <input type="password" id="lpass" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="error-message">{error}</div>}
        <div className="space"></div>
        <button className="btn primary">تسجيل الدخول</button>
      </form>
    </section>
  )
}
