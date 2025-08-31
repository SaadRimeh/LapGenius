import { useState } from 'react'
import { loadProducts } from '../data/products.js'
import { addSuggestion } from '../data/suggestions.js'

export default function AskMe(){
  const [major, setMajor] = useState('cs')
  const [budget, setBudget] = useState('15000000')
  const [results, setResults] = useState([])
  const onAsk = (e)=>{
    e.preventDefault()
    const products = loadProducts()
    const b = Number(budget)
    let filtered = products.filter(p=> p.price <= b)
    if(major === 'gaming') filtered = filtered.filter(p=> /RTX|GTX|RX/i.test(p.gpu || ''))
    if(major === 'design') filtered = filtered.filter(p=> p.ram >= 16)
    if(major === 'cs') filtered = filtered.filter(p=> p.ram >= 8)
    filtered.sort((a,b)=> b.price - a.price)
    const top = filtered.slice(0,6)
    setResults(top)
    addSuggestion({ major, budget:b, results: top.map(t=>t.id) })
  }
  return (
    <section className="section">
      <h2>اسألني — اختر التخصص والميزانية</h2>
      <form className="form" onSubmit={onAsk}>
        <div className="row">
          <div>
            <label>التخصص</label>
            <select value={major} onChange={e=>setMajor(e.target.value)}>
              <option value="cs">علوم حاسوب / برمجة</option>
              <option value="design">تصميم / مونتاج</option>
              <option value="office">أعمال مكتبية / دراسة</option>
              <option value="gaming">ألعاب</option>
            </select>
          </div>
          <div>
            <label>الميزانية (ل.س)</label>
            <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} />
          </div>
        </div>
        <div className="space"></div>
        <button className="btn primary">اقترح لابتوبات</button>
      </form>
      <div className="space"></div>
      {results.length>0 && <div className="grid">
        {results.map(p=> (
          <div key={p.id} className="card">
            <div className="thumb"><i className="fa-solid fa-laptop"></i></div>
            <div className="body">
              <strong>{p.name}</strong>
              <div className="muted">{p.cpu} • {p.ram}GB • {p.storage}GB</div>
              <div className="price">{p.price.toLocaleString()} ل.س</div>
            </div>
          </div>
        ))}
      </div>}
    </section>
  )
}
