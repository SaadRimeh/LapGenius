export function loadOrders(){
  const saved = localStorage.getItem('lg_orders')
  if(saved){ try{ return JSON.parse(saved) }catch{} }
  const sample = [
    { id: 1001, user:'moh@example.com', items: [{id:1, qty:1}, {id:3, qty:1}], total: 32500000, status:'جديد' },
    { id: 1002, user:'sara@example.com', items: [{id:2, qty:1}], total: 16500000, status:'قيد المعالجة' },
  ]
  localStorage.setItem('lg_orders', JSON.stringify(sample))
  return sample
}
export function saveOrders(list){
  localStorage.setItem('lg_orders', JSON.stringify(list))
}
