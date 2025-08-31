import useLaptops from '../../hooks/useLaptops.js'
import useOrders from '../../hooks/useOrders.js'

export default function AdminOverview(){
  const { data: products } = useLaptops()
  const { data: orders } = useOrders()
  const income = orders.filter(o=> o.status !== 'cancelled').reduce((s,o)=> s+Number(o.total||0), 0)
  const stats = [
    { label:'المنتجات', value: products.length },
    { label:'الطلبات', value: orders.length },
    { label:'إيرادات تقديرية', value: income.toLocaleString() + ' ل.س' },
  ]
  return (
    <div>
      <h2>نظرة عامة</h2>
      <div className="space"></div>
      <div className="grid">
        {stats.map((s,idx)=>(
          <div key={idx} className="card"><div className="body"><strong>{s.label}</strong><div className="muted">{s.value}</div></div></div>
        ))}
      </div>
    </div>
  )
}
