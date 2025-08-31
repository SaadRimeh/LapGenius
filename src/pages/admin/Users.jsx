import { useState } from 'react'
const defaultUsers = [
  { id:1, name:'مهند', email:'moh@example.com', role:'admin' },
  { id:2, name:'سارة', email:'sara@example.com', role:'user' },
]
export default function AdminUsers(){
  const [users, setUsers] = useState(()=>{
    const saved = localStorage.getItem('lg_users')
    if(saved){ try{ return JSON.parse(saved) }catch{} }
    localStorage.setItem('lg_users', JSON.stringify(defaultUsers))
    return defaultUsers
  })
  const [form, setForm] = useState({ name:'', email:'', role:'user' })
  const add = (e)=>{
    e.preventDefault()
    const id = Math.max(0, ...users.map(u=>u.id)) + 1
    const next = [{ id, ...form }, ...users]
    setUsers(next)
    localStorage.setItem('lg_users', JSON.stringify(next))
    setForm({ name:'', email:'', role:'user' })
  }
  const del = (id)=>{
    const next = users.filter(u=>u.id!==id)
    setUsers(next); localStorage.setItem('lg_users', JSON.stringify(next))
  }
  return (
    <div>
      <h2>إدارة المستخدمين</h2>
      <div className="space"></div>
      <form className="form" onSubmit={add}>
        <div className="row">
          <div><label>الاسم</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
          <div><label>البريد</label><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
          <div>
            <label>الدور</label>
            <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="space"></div>
        <button className="btn primary">إضافة</button>
      </form>
      <div className="space"></div>
      <table className="table">
        <thead><tr><th>#</th><th>الاسم</th><th>البريد</th><th>الدور</th><th>إجراءات</th></tr></thead>
        <tbody>
          {users.map(u=> (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td><button className="btn danger" onClick={()=>del(u.id)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
