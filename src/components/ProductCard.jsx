import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
export default function ProductCard({ p }){
  const { add } = useCart()
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="thumb" onClick={()=>navigate(`/product/${p._id}`)} style={{cursor:'pointer'}}>
        <i className="fa-solid fa-laptop"></i>
      </div>
      <div className="body">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <strong>{p.name}</strong>
          <span className="price">{Number(p.price).toLocaleString()} ل.س</span>
        </div>
        <div className="muted">{p.specs?.cpu} • {p.specs?.ram}GB • {p.specs?.ssd}GB</div>
        <div className="space"></div>
        <div className="actions-row">
          <button className="btn primary" onClick={()=>add(p)}>أضف إلى السلة</button>
          <button className="btn ghost" onClick={()=>navigate(`/product/${p._id}`)}>تفاصيل</button>
        </div>
      </div>
    </div>
  )
}
