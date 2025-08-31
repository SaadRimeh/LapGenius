import { useEffect, useState, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, checkout } from '../api/client';

export default function useCart(clientId=1){
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async ()=>{
    try{
      setLoading(true); setError(null);
      const res = await getCart(clientId);
      setCart(res.cart); setItems(res.items);
    }catch(e){ setError(e); } finally { setLoading(false); }
  }, [clientId]);

  const add = useCallback(async (laptop_id, quantity=1)=>{ await addToCart(clientId, laptop_id, quantity); await refresh(); }, [clientId, refresh]);
  const updateQty = useCallback(async (itemId, quantity)=>{ await updateCartItem(clientId, itemId, quantity); await refresh(); }, [clientId, refresh]);
  const remove = useCallback(async (itemId)=>{ await removeCartItem(clientId, itemId); await refresh(); }, [clientId, refresh]);
  const doCheckout = useCallback(async ()=>{ const order = await checkout(clientId); await refresh(); return order; }, [clientId, refresh]);

  useEffect(()=>{ refresh(); }, [refresh]);

  return { cart, items, loading, error, refresh, add, updateQty, remove, doCheckout };
}