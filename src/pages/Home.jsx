import { useNavigate } from 'react-router-dom'
export default function Home(){
  const navigate = useNavigate()
  return (
    <section className="section">
      <h2>مرحباً بك في LapGenius</h2>
      <p className="muted">متجر لابتوبات داخل سوريا مع ميزة ذكية تقترح لك أفضل جهاز حسب تخصّصك وميزانيتك.</p>
      <div className="space"></div>
      <div className="flex">
        <button className="btn primary" onClick={()=>navigate('/ask')}>جرّب ميزة اسألني</button>
        <button className="btn ghost" onClick={()=>navigate('/store')}>تصفح المتجر</button>
      </div>
    </section>
  )
}
