export default function Settings(){
  return (
    <section className="form">
      <h2>الإعدادات</h2>
      <form onSubmit={(e)=>{e.preventDefault(); alert('تم حفظ الإعدادات (واجهة فقط)')}}>
        <div className="row">
          <div>
            <label>اسم المتجر</label>
            <input defaultValue="LapGenius" />
          </div>
          <div>
            <label>عملة العرض</label>
            <input defaultValue="ل.س" />
          </div>
        </div>
        <div className="row">
          <div>
            <label>ضريبة افتراضية (%)</label>
            <input type="number" defaultValue="0" />
          </div>
        </div>
        <div className="space"></div>
        <button className="btn primary">حفظ</button>
      </form>
    </section>
  )
}
