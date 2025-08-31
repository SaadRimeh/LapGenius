import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RequireAuth(){
  const { user } = useAuth()
  if(!user) return <Navigate to="/register" replace />
  return <Outlet />
}


