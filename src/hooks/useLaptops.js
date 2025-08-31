import { useEffect, useState, useCallback } from 'react';
import { getLaptops, createLaptop, updateLaptop, deleteLaptop } from '../api/client';

export default function useLaptops(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async ()=>{
    try{
      setLoading(true); setError(null);
      const rows = await getLaptops();
      setData(rows);
    }catch(e){ setError(e); } finally { setLoading(false); }
  }, []);

  const add = useCallback(async (payload)=>{ await createLaptop(payload); await refresh(); }, [refresh]);
  const update = useCallback(async (id, payload)=>{ await updateLaptop(id, payload); await refresh(); }, [refresh]);
  const remove = useCallback(async (id)=>{ await deleteLaptop(id); await refresh(); }, [refresh]);

  useEffect(()=>{ refresh(); }, [refresh]);

  return { data, loading, error, refresh, add, update, remove };
}