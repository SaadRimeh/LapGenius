import { createContext, useContext, useEffect, useState } from 'react'
import { adminLogin, clientLogin } from '../api/client'

const AuthContext = createContext()
export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  useEffect(()=>{ try{ const s=localStorage.getItem('lg_user'); if(s) setUser(JSON.parse(s)) }catch(e){} },[])
  useEffect(()=>{ try{ if(user) localStorage.setItem('lg_user', JSON.stringify(user)); else localStorage.removeItem('lg_user') }catch(e){} },[user])
  const decodeToken = (token)=>{
    try{
      const payload = JSON.parse(atob(token.split('.')[1] || ''))
      return payload
    }catch(_e){ return null }
  }
  const loginAdmin = async (email, password)=>{
    const { token } = await adminLogin(email, password)
    try{ localStorage.setItem('lg_token', token) }catch(e){}
    const payload = decodeToken(token)
    setUser({ id: payload?.id, email: payload?.email || email, role: payload?.role || 'admin' })
  }
  const loginClient = async (email, password)=>{
    const { token } = await clientLogin(email, password)
    try{ localStorage.setItem('lg_token', token) }catch(e){}
    const payload = decodeToken(token)
    setUser({ id: payload?.id, email: payload?.email || email, role: payload?.role || 'client' })
  }
  const logout = ()=> { try{ localStorage.removeItem('lg_token') }catch(e){}; setUser(null) }
  return <AuthContext.Provider value={{ user, loginAdmin, loginClient, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext)
