const BASE_URL = 'http://localhost:5001/api';

function getToken(){
  try { return localStorage.getItem('lg_token') || '' } catch(e){ return '' }
}

async function http(method, url, data){
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
  const token = getToken();
  if(token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('Sending request with token', { method, url, tokenLength: token.length, tokenStart: token.substring(0, 20) + '...' })
  } else {
    console.log('No token found for request', { method, url })
  }
  let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  if(method === 'GET'){
    const sep = fullUrl.includes('?') ? '&' : '?'
    fullUrl = `${fullUrl}${sep}_ts=${Date.now()}`
  }
  const res = await fetch(fullUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined
  });
  if(!res.ok){
    let err = {};
    try { err = await res.json(); } catch(e){}
    console.error('Request failed', { status: res.status, statusText: res.statusText, error: err })
    throw new Error(err.error || res.statusText);
  }
  if(res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (url) => http('GET', url),
  post: (url, data) => http('POST', url, data),
  put: (url, data) => http('PUT', url, data),
  del: (url) => http('DELETE', url),
};

export const adminLogin = (email, password) => api.post('/admin/login', { email, password });
export const clientLogin = (email, password) => api.post('/client/login', { email, password });

/* -------- Clients -------- */
export const getClients = () => api.get('/client');
export const getClient = (id) => api.get(`/client/${id}`);
export const createClient = (payload) => api.post('/client', payload);
export const updateClient = (id, payload) => api.put(`/client/${id}`, payload);
export const deleteClient = (id) => api.del(`/client/${id}`);

/* -------- Admins -------- */
export const getAdmins = () => api.get('/admin');
export const getAdmin = (id) => api.get(`/admin/${id}`);
export const createAdmin = (payload) => api.post('/admin', payload);
export const updateAdmin = (id, payload) => api.put(`/admin/${id}`, payload);
export const deleteAdmin = (id) => api.del(`/admin/${id}`);

/* -------- Laptops -------- */
export const getLaptops = () => api.get('/laptop');
export const getLaptop = (id) => api.get(`/laptop/${id}`);
export const createLaptop = (payload) => api.post('/laptop', payload);
export const updateLaptop = (id, payload) => api.put(`/laptop/${id}`, payload);
export const deleteLaptop = (id) => api.del(`/laptop/${id}`);

/* -------- Orders -------- */
export const getOrders = () => api.get('/order');
export const getOrder = (id) => api.get(`/order/${id}`);
export const createOrder = (payload) => api.post('/order', payload);
export const updateOrder = (id, payload) => api.put(`/order/${id}`, payload);
export const deleteOrder = (id) => api.del(`/order/${id}`);

/* -------- Purchase (order items) -------- */
export const getPurchases = () => api.get('/purchase');
export const getPurchase = (id) => api.get(`/purchase/${id}`);
export const createPurchase = (payload) => api.post('/purchase', payload);
export const updatePurchase = (id, payload) => api.put(`/purchase/${id}`, payload);
export const deletePurchase = (id) => api.del(`/purchase/${id}`);

/* -------- Submit (suggestions) -------- */
export const getSubmits = () => api.get('/submit');
export const getSubmit = (id) => api.get(`/submit/${id}`);
export const createSubmit = (payload) => api.post('/submit', payload);
export const updateSubmit = (id, payload) => api.put(`/submit/${id}`, payload);
export const deleteSubmit = (id) => api.del(`/submit/${id}`);

/* -------- Manage (settings) -------- */
export const getSettings = () => api.get('/manage');
export const setSetting = (key, value) => api.post('/manage', { key, value });
export const updateSetting = (id, value) => api.put(`/manage/${id}`, { value });
export const deleteSetting = (id) => api.del(`/manage/${id}`);

/* -------- Cancle (cancellations) -------- */
export const getCancels = () => api.get('/cancle');
export const requestCancel = (order_id, reason) => api.post('/cancle', { order_id, reason });
export const updateCancel = (id, payload) => api.put(`/cancle/${id}`, payload);
export const deleteCancel = (id) => api.del(`/cancle/${id}`);

/* -------- Date (demo) -------- */
export const getDates = () => api.get('/date');
export const addDate = (iso, note) => api.post('/date', { iso, note });
export const updateDate = (id, payload) => api.put(`/date/${id}`, payload);
export const deleteDate = (id) => api.del(`/date/${id}`);

/* -------- Cart Ops -------- */
export const getCart = (clientId) => api.get(`/cart/${clientId}`);
export const addToCart = (clientId, laptop_id, quantity=1) => api.post(`/cart/${clientId}/add`, { laptop_id, quantity });
export const updateCartItem = (clientId, itemId, quantity) => api.put(`/contain/${itemId}`, { quantity }); // alias
export const removeCartItem = (clientId, itemId) => api.del(`/cart/${clientId}/item/${itemId}`);
export const checkout = (clientId) => api.post(`/cart/${clientId}/checkout`);