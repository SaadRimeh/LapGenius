import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../utils/validators.js'
import { createClient } from '../api/client'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    setError(''); setMsg('')
    if(!name.trim()) return setError('يرجى إدخال اسم المستخدم')
    if(!email) return setError('يرجى إدخال البريد الإلكتروني')
    if(!validateEmail(email)) return setError('البريد الإلكتروني غير صحيح')
    if(!password) return setError('يرجى إدخال كلمة المرور')
    const { isValid, error } = validatePassword(password)
    if(!isValid) return setError('كلمة المرور غير قوية:\n'+error)
    if(password !== confirm) return setError('كلمة المرور غير متطابقة')
    setSubmitting(true)
    createClient({ name, email, password })
      .then(()=>{
        setMsg('تم إنشاء الحساب بنجاح! سيتم تحويلك لصفحة تسجيل الدخول')
        setTimeout(()=> navigate('/login'), 1000)
      })
      .catch(err=> setError(err.message || 'فشل إنشاء الحساب'))
      .finally(()=> setSubmitting(false))
  }
  return (
    <section className="form">
      <h2>إنشاء حساب</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div>
            <label>اسم المستخدم</label>
            <input value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label>البريد الإلكتروني</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div>
            <label>كلمة المرور</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div>
            <label>أعد كتابة كلمة المرور</label>
            <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {msg && <div className="success-message">{msg}</div>}
        <div className="space"></div>
        <button className="btn primary" disabled={submitting}>{submitting ? 'جارٍ...' : 'أنشئ حسابك'}</button>
      </form>
    </section>
  )
}
