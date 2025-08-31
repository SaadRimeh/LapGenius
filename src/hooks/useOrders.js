import { useEffect, useState, useCallback } from 'react';
import { getOrders } from '../api/client.js';

export default function useOrders(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async ()=>{
    try{
      setLoading(true); setError(null);
      const rows = await getOrders();
      setData(rows);
    }catch(e){ setError(e); } finally { setLoading(false); }
  }, []);

  useEffect(()=>{ refresh(); }, [refresh]);

  // Auto refresh when tab gains focus or visibility changes
  useEffect(()=>{
    const onFocus = ()=> refresh();
    const onVisibility = ()=>{ if(document.visibilityState === 'visible') refresh(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return ()=>{
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [refresh]);

  return { data, loading, error, refresh };
}