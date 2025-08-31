import { useMemo, useState } from 'react'
import useLaptops from '../hooks/useLaptops.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Store(){
  const { data: products, loading } = useLaptops()
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [ram, setRam] = useState('')
  const [cpu, setCpu] = useState('')
  const prices = products.length ? products.map(p=>Number(p.price)) : [0]
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const rams = Array.from(new Set(products.map(p=>Number(p.specs?.ram)).filter(Boolean))).sort((a,b)=>a-b)
  const filtered = useMemo(()=>{
    return products.filter(p=> {
      const byName = p.name.toLowerCase().includes(search.toLowerCase())
      const byPrice = maxPrice === '' ? true : Number(p.price) <= Number(maxPrice)
      const pRam = Number(p.specs?.ram)
      const byRam = ram === '' ? true : pRam === Number(ram)
      const pCpu = (p.specs?.cpu || '').toLowerCase()
      const byCpu = cpu === '' ? true : pCpu.includes(cpu.toLowerCase())
      return byName && byPrice && byRam && byCpu
    })
  }, [products, search, maxPrice, ram, cpu])
  const resetFilters = ()=> { setSearch(''); setMaxPrice(''); setRam(''); setCpu('') }
  return (
    <section>
      <h2>المتجر</h2>
      <div className="space"></div>
      <form className="form">
        <div className="row">
          <div>
            <label>بحث بالاسم</label>
            <input placeholder="مثال: Lenovo" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div>
            <label>السعر الأقصى (من {min.toLocaleString()} إلى {max.toLocaleString()} ل.س)</label>
            <input type="number" placeholder="لا حد" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
          </div>
          <div>
            <label>الرام</label>
            <select value={ram} onChange={e=>setRam(e.target.value)}>
              <option value="">الكل</option>
              {rams.map(r => <option key={r} value={r}>{r} GB</option>)}
            </select>
          </div>
          <div>
            <label>المعالج</label>
            <input placeholder="مثال: i5, Ryzen" value={cpu} onChange={e=>setCpu(e.target.value)} />
          </div>
        </div>
        <div className="space"></div>
        <div className="flex" style={{justifyContent:'space-between'}}>
          <div className="muted">عدد النتائج: {filtered.length}</div>
          <div className="flex">
            <button type="button" className="btn ghost" onClick={resetFilters}>إزالة الفلاتر</button>
          </div>
        </div>
      </form>
      <div className="space"></div>
      {loading ? <div className="muted">...جاري التحميل</div> : (
        <div className="grid">
          {filtered.map(p=> <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </section>
  )
}
