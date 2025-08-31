import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar(){
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <div className="container wrap">
        <div className="brand" onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
          <i className="fa-solid fa-laptop"></i>
          <span>LapGenius</span>
        </div>
        <div>
          <NavLink to="/" className={({isActive})=> isActive?'active':''}>الرئيسية</NavLink>
          <NavLink to="/ask" className={({isActive})=> isActive?'active':''}>اسألني</NavLink>
          <NavLink to="/store" className={({isActive})=> isActive?'active':''}>المتجر</NavLink>
          <NavLink to="/cart" className={({isActive})=> isActive?'active':''}>السلة ({count})</NavLink>
          {user && (
            <NavLink to="/orders" className={({isActive})=> isActive?'active':''}>طلباتي</NavLink>
          )}
          {user && user.role === 'admin' && (
            <NavLink to="/dashboard" className={({isActive})=> isActive?'active':''}>لوحة التحكم</NavLink>
          )}
        </div>
        <div className="actions">
          {!user ? (
            <>
              <button className="btn ghost" onClick={()=>navigate('/login')}>دخول</button>
              <button className="btn primary" onClick={()=>navigate('/register')}>حساب جديد</button>
            </>
          ) : (
            <>
              <span className="muted">مرحباً، {user.name || user.email}</span>
              <button className="btn danger" onClick={logout}>خروج</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
