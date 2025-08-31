import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLaptop } from '../api/client.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetails(){
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    (async()=>{
      try{ setLoading(true); const p = await getLaptop(id); setProduct(p) } finally { setLoading(false) }
    })()
  }, [id])
  if(loading) return <div className="section muted">...جاري التحميل</div>
  if(!product) return <div className="section">لم يتم العثور على المنتج.</div>
  return (
    <section className="section">
      <h2>{product.name}</h2>
      <div className="grid" style={{gridTemplateColumns:'1fr 1.5fr'}}>
        <div className="card"><div className="thumb"><i className="fa-solid fa-laptop"></i></div></div>
        <div className="card">
          <div className="body">
            <div className="muted">{product.brand}</div>
            <div className="space"></div>
            <div>المعالج: {product.specs?.cpu}</div>
            <div>الرام: {product.specs?.ram} GB</div>
            <div>التخزين: {product.specs?.ssd} GB</div>
            <div>البطاقة: {product.specs?.gpu}</div>
            <div className="space"></div>
            <p className="muted">{product.description}</p>
            <div className="space"></div>
            <strong className="price">{Number(product.price).toLocaleString()} ل.س</strong>
            <div className="space"></div>
            <button className="btn primary" onClick={()=>add(product)}>أضف للسلة</button>
          </div>
        </div>
      </div>
    </section>
  )
}
