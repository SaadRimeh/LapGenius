import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const CartContext = createContext()
export function CartProvider({ children }){
  const [items, setItems] = useState([])
  useEffect(()=>{ try{ const s=localStorage.getItem('lg_cart'); if(s) setItems(JSON.parse(s)) }catch(e){} },[])
  useEffect(()=>{ try{ localStorage.setItem('lg_cart', JSON.stringify(items)) }catch(e){} },[items])
  const add = (product)=>{
    setItems(prev=>{
      const productId = product._id || product.id
      const idx = prev.findIndex(i=> (i.product._id || i.product.id) === productId)
      if(idx>-1){ const copy=[...prev]; copy[idx]={...copy[idx], qty: copy[idx].qty+1}; return copy }
      return [...prev, { product, qty:1 }]
    })
  }
  const remove = (id)=> setItems(prev => prev.filter(i=> (i.product._id || i.product.id) !== id))
  const clear = ()=> setItems([])
  const count = useMemo(()=> items.reduce((s,i)=> s+i.qty, 0), [items])
  const total = useMemo(()=> items.reduce((s,i)=> s + i.qty*i.product.price, 0), [items])
  return <CartContext.Provider value={{ items, add, remove, clear, count, total }}>{children}</CartContext.Provider>
}
export const useCart = ()=> useContext(CartContext)
