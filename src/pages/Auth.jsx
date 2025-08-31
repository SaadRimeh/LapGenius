import { useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

export default function Auth(){
  const [tab, setTab] = useState('login')
  return (
    <section>
      <div className="tabs" style={{display:'flex', gap:12, marginBottom:16}}>
        <button className={`btn ${tab==='login'?'primary':''}`} onClick={()=>setTab('login')}>تسجيل الدخول</button>
        <button className={`btn ${tab==='register'?'primary':''}`} onClick={()=>setTab('register')}>إنشاء حساب</button>
      </div>
      {tab==='login' ? <Login /> : <Register />}
    </section>
  )
}


