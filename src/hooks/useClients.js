import { useEffect, useState, useCallback } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../api/client';

export default function useClients(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async ()=>{
    try{
      setLoading(true); setError(null);
      const rows = await getClients();
      setData(rows);
    }catch(e){ setError(e); } finally { setLoading(false); }
  }, []);

  const add = useCallback(async (payload)=>{ await createClient(payload); await refresh(); }, [refresh]);
  const update = useCallback(async (id, payload)=>{ await updateClient(id, payload); await refresh(); }, [refresh]);
  const remove = useCallback(async (id)=>{ await deleteClient(id); await refresh(); }, [refresh]);

  useEffect(()=>{ refresh(); }, [refresh]);

  return { data, loading, error, refresh, add, update, remove };
}