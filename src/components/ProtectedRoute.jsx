import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
export default function ProtectedRoute(){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  if(user.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}
