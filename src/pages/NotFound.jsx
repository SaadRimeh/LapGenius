import { Link } from 'react-router-dom'
export default function NotFound(){
  return <section className="section">
    <h2>الصفحة غير موجودة</h2>
    <p className="muted">تأكد من الرابط.</p>
    <Link to="/" className="btn ghost" style={{display:'inline-block', marginTop:12}}>العودة للرئيسية</Link>
  </section>
}
