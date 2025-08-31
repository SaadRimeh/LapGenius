import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import useOrders from '../hooks/useOrders.js'

export default function Orders(){
  const { user } = useAuth()
  const { data: orders, loading, refresh } = useOrders()
  const mine = useMemo(()=> orders.filter(o=> (o.client?._id === user?.id)), [orders, user])
  return (
    <section className="section">
      <h2>طلباتي</h2>
      <div className="space"></div>
      <button className="btn ghost" onClick={refresh} disabled={loading}>تحديث</button>
      {loading ? <div className="muted">...جاري التحميل</div> : (
        mine.length===0 ? <div className="muted">لا توجد طلبات بعد.</div> : (
          <table className="table">
            <thead><tr><th>#</th><th>التاريخ</th><th>الإجمالي</th><th>الحالة</th></tr></thead>
            <tbody>
              {mine.map(o=> (
                <tr key={o._id}>
                  <td>{o._id.slice(-6)}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{Number(o.total).toLocaleString()} ل.س</td>
                  <td>{translateStatus(o.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </section>
  )
}

function translateStatus(status){
  switch(status){
    case 'pending': return 'جديد'
    case 'paid': return 'قيد المعالجة'
    case 'shipped': return 'مكتمل'
    case 'cancelled': return 'ملغي'
    default: return status
  }
}


