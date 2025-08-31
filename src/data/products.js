export const DEFAULT_PRODUCTS = [
  { id:1, name:'Lenovo IdeaPad 3', brand:'Lenovo', cpu:'i5-1135G7', ram:8, storage:256, gpu:'Iris Xe', price: 10500000, desc:'جهاز عملي للدراسة والعمل الخفيف.' },
  { id:2, name:'HP Pavilion 15', brand:'HP', cpu:'i7-1255U', ram:16, storage:512, gpu:'MX450', price: 16500000, desc:'جهاز متوسط بأداء جيد وتعدد مهام.' },
  { id:3, name:'ASUS TUF Gaming F15', brand:'ASUS', cpu:'i5-11400H', ram:16, storage:512, gpu:'RTX 3050', price: 22000000, desc:'مخصص للألعاب ببطاقة رسومية قوية.' },
  { id:4, name:'Acer Aspire 7', brand:'Acer', cpu:'Ryzen 5 5500U', ram:8, storage:512, gpu:'GTX 1650', price: 14500000, desc:'توازن ممتاز بين السعر والأداء.' },
  { id:5, name:'Apple MacBook Air M1', brand:'Apple', cpu:'M1', ram:8, storage:256, gpu:'Integrated', price: 32000000, desc:'خفيف جداً وبطارية ممتازة.' },
  { id:6, name:'Dell Vostro 3510', brand:'Dell', cpu:'i3-1115G4', ram:8, storage:256, gpu:'UHD', price: 8500000, desc:'للمهام المكتبية والتصفح.' }
]
export function loadProducts(){
  const saved = localStorage.getItem('lg_admin_products')
  if(saved){
    try{ return JSON.parse(saved) }catch{}
  }
  return DEFAULT_PRODUCTS
}
export function saveProducts(list){
  localStorage.setItem('lg_admin_products', JSON.stringify(list))
}
