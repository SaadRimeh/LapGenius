import { loadSuggestions } from '../../data/suggestions.js'
import { loadProducts } from '../../data/products.js'
export default function AdminSuggestions(){
  const list = loadSuggestions()
  const products = loadProducts()
  const map = Object.fromEntries(products.map(p=> [p.id, p]))
  return (
    <div>
      <h2>أسئلة اسألني</h2>
      <div className="space"></div>
      {list.length===0? <p className="muted">لا توجد أسئلة بعد.</p> : (
        <table className="table">
          <thead><tr><th>#</th><th>التخصص</th><th>الميزانية</th><th>الاقتراحات</th></tr></thead>
          <tbody>
            {list.map(s=> (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.major}</td>
                <td>{s.budget.toLocaleString()} ل.س</td>
                <td>{s.results.map(id=> map[id]?.name).filter(Boolean).join('، ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
