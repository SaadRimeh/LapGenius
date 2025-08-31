import { useMemo, useState } from 'react'
import useLaptops from '../../hooks/useLaptops.js'

export default function AdminProducts(){
  const { data: list, add, remove, loading } = useLaptops()
  const [form, setForm] = useState({ name:'', brand:'', cpu:'', ram:8, storage:256, gpu:'', price:0, desc:'' })
  const [search, setSearch] = useState('')
  const filtered = useMemo(()=> list.filter(p=> p.name.toLowerCase().includes(search.toLowerCase())), [list, search])
  const onAdd = async (e)=>{
    e.preventDefault()
    const payload = {
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      description: form.desc,
      specs: { cpu: form.cpu, ram: Number(form.ram), ssd: Number(form.storage), gpu: form.gpu },
      stock: 0,
    }
    await add(payload)
    setForm({ name:'', brand:'', cpu:'', ram:8, storage:256, gpu:'', price:0, desc:'' })
  }
  const del = async (id)=>{ await remove(id) }
  return (
    <div>
      <h2>إدارة المنتجات</h2>
      {loading && <div className="muted">...جاري التحميل</div>}
      <div className="space"></div>
      <form className="form" onSubmit={onAdd}>
        <div className="row">
          <div><label>الاسم</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
          <div><label>الماركة</label><input value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} /></div>
          <div><label>المعالج</label><input value={form.cpu} onChange={e=>setForm({...form, cpu:e.target.value})} /></div>
          <div><label>الرام</label><input type="number" value={form.ram} onChange={e=>setForm({...form, ram:e.target.value})} /></div>
        </div>
        <div className="row">
          <div><label>التخزين</label><input type="number" value={form.storage} onChange={e=>setForm({...form, storage:e.target.value})} /></div>
          <div><label>البطاقة</label><input value={form.gpu} onChange={e=>setForm({...form, gpu:e.target.value})} /></div>
          <div><label>السعر (ل.س)</label><input type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} /></div>
        </div>
        <div><label>وصف</label><textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} /></div>
        <div className="space"></div>
        <button className="btn primary">إضافة منتج</button>
      </form>
      <div className="space"></div>
      <div className="form">
        <label>بحث</label>
        <input placeholder="بحث بالاسم" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="space"></div>
      <table className="table">
        <thead><tr><th>#</th><th>الاسم</th><th>السعر</th><th>المعالج</th><th>رام</th><th>إجراءات</th></tr></thead>
        <tbody>
          {filtered.map(p=> (
            <tr key={p._id}>
              <td>{p._id.slice(-6)}</td>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString()}</td>
              <td>{p.specs?.cpu || '-'}</td>
              <td>{p.specs?.ram ?? '-'}</td>
              <td>
                <div className="actions-row">
                  <button className="btn danger" onClick={()=>del(p._id)}>حذف</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
