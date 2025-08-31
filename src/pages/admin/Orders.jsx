import { useState } from 'react'
import useOrders from '../../hooks/useOrders.js'
import { updateOrder } from '../../api/client.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminOrders(){
  const { data: list, refresh, loading } = useOrders()
  const [busyId, setBusyId] = useState(null)
  const { user } = useAuth()
  
  const updateStatus = async (id, status)=>{
    try{
      console.log('Attempting to update order', { orderId: id, status, user })
      setBusyId(id)
      await updateOrder(id, { status })
      await refresh()
    }catch(e){
      console.error('Update failed', e)
      alert(`خطأ أثناء تحديث الحالة: ${e.message || e}`)
    }finally{
      setBusyId(null)
    }
  }
  return (
    <div>
      <h2>إدارة الطلبات</h2>
      <div className="space"></div>
      <button className="btn ghost" onClick={refresh} disabled={loading}>تحديث</button>
      {loading && <div className="muted">...جاري التحميل</div>}
      <div className="space"></div>
      <table className="table">
        <thead><tr><th>#</th><th>المستخدم</th><th>الإجمالي</th><th>الحالة</th><th>إجراءات</th></tr></thead>
        <tbody>
          {list.map(o=> (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{o.client?.email}</td>
              <td>{Number(o.total).toLocaleString()} ل.س</td>
              <td>{o.status}</td>
              <td className="actions-row">
                <button className="btn ghost" disabled={busyId===o._id} onClick={()=>updateStatus(o._id,'pending')}>جديد</button>
                <button className="btn ghost" disabled={busyId===o._id} onClick={()=>updateStatus(o._id,'paid')}>قيد المعالجة</button>
                <button className="btn primary" disabled={busyId===o._id} onClick={()=>updateStatus(o._id,'shipped')}>مكتمل</button>
                <button className="btn danger" disabled={busyId===o._id} onClick={()=>updateStatus(o._id,'cancelled')}>إلغاء</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
