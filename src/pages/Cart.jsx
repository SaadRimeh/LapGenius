import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { createOrder } from '../api/client.js'
import { useNavigate } from 'react-router-dom'
export default function Cart(){
  const { items, remove, clear, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const checkout = async ()=>{
    if(!user) return alert('يرجى تسجيل الدخول أولاً')
    const payload = {
      client: user.id,
      items: items.map(({product, qty})=> ({ laptop: product._id || product.id, quantity: qty })),
    }
    await createOrder(payload)
    clear()
    navigate('/orders')
  }
  return (
    <section className="section">
      <h2>سلة المشتريات</h2>
      <div className="space"></div>
      {items.length===0 ? <p className="muted">السلة فارغة.</p> : (
        <>
          {items.map(({product, qty})=> (
            <div key={product._id || product.id} className="card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{product.name}</strong>
                <div className="muted">{qty} × {Number(product.price).toLocaleString()} ل.س</div>
              </div>
              <button className="btn danger" onClick={()=>remove(product._id || product.id)}>حذف</button>
            </div>
          ))}
          <div className="space"></div>
          <div className="flex" style={{justifyContent:'space-between'}}>
            <strong>الإجمالي: {total.toLocaleString()} ل.س</strong>
            <div className="flex">
              <button className="btn ghost" onClick={clear}>تفريغ السلة</button>
              <button className="btn primary" onClick={checkout}>إكمال الطلب</button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
