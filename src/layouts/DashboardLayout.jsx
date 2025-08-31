import { NavLink, Outlet } from 'react-router-dom'
export default function DashboardLayout(){
  return (
    <section className="dashboard">
      <aside className="sidebar">
        <NavLink end to="/dashboard" className={({isActive})=>'side-item ' + (isActive?'active':'')}>نظرة عامة</NavLink>
        <NavLink to="/dashboard/products" className={({isActive})=>'side-item ' + (isActive?'active':'')}>المنتجات</NavLink>
        <NavLink to="/dashboard/orders" className={({isActive})=>'side-item ' + (isActive?'active':'')}>الطلبات</NavLink>
        <NavLink to="/dashboard/users" className={({isActive})=>'side-item ' + (isActive?'active':'')}>المستخدمون</NavLink>
        <NavLink to="/dashboard/suggestions" className={({isActive})=>'side-item ' + (isActive?'active':'')}>أسئلة اسألني</NavLink>
        <NavLink to="/dashboard/settings" className={({isActive})=>'side-item ' + (isActive?'active':'')}>الإعدادات</NavLink>
      </aside>
      <div>
        <Outlet />
      </div>
    </section>
  )
}
