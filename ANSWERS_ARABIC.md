# إجابات الأسئلة التقنية - نظام LapGenius

## 1. ما هي آلية التشفير المستخدمة؟

**آلية التشفير المستخدمة:**
- **تشفير كلمات المرور:** يتم استخدام مكتبة `bcryptjs` مع salt rounds = 10
- **JWT Tokens:** يتم استخدام `jsonwebtoken` لتشفير بيانات المستخدم
- **مفتاح التشفير:** يتم استخدام متغير بيئي `JWT_SECRET` أو مفتاح افتراضي `'dev_secret'`

```javascript
// تشفير كلمة المرور
const passwordHash = await bcrypt.hash(password || 'admin123A', 10)

// إنشاء JWT token
const payload = { id: user._id.toString(), email: user.email, role: user.role }
return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
```

## 2. كيف حققنا استجابة النظام خلال 3 ثوانٍ؟

**تحسينات الأداء المستخدمة:**
- **إلغاء التخزين المؤقت:** تم تعطيل التخزين المؤقت للاستجابات لضمان البيانات المحدثة
- **استعلامات قاعدة البيانات المحسنة:** استخدام `populate()` لتحميل البيانات المرتبطة
- **فهرسة قاعدة البيانات:** تم إنشاء فهارس على الحقول المهمة مثل `email`
- **إضافة timestamp للطلبات:** منع التخزين المؤقت في المتصفح

```javascript
// إلغاء التخزين المؤقت
app.use((req, res, next)=>{
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', 'no-store')
  next()
})

// إضافة timestamp للطلبات
if(method === 'GET'){
  const sep = fullUrl.includes('?') ? '&' : '?'
  fullUrl = `${fullUrl}${sep}_ts=${Date.now()}`
}
```

## 3. لماذا استخدمنا Node.js؟

**مزايا Node.js المستفادة:**
- **JavaScript في الواجهة والخلفية:** تقليل التعقيد وتوحيد اللغة
- **أداء عالي:** معالجة غير متزامنة للطلبات المتعددة
- **مكتبات غنية:** Express.js, Mongoose, JWT, bcrypt
- **سهولة التطوير:** بيئة تطوير سريعة مع nodemon
- **مجتمع كبير:** دعم وتوثيق ممتاز

```json
{
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.5.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3"
  }
}
```

## 4. كيف أنشأنا حساب ADMIN مع صلاحيات الوصول للوحة التحكم؟

**إنشاء حساب المدير:**
- **سكريبت البذر:** يتم إنشاء حساب المدير تلقائياً عند تشغيل `seed.js`
- **بيانات المدير الافتراضية:** `admin1@example.com` / `admin123A`
- **دور المستخدم:** حقل `role: 'admin'` في نموذج المستخدم
- **حماية الوصول:** middleware للتحقق من دور المدير

```javascript
// إنشاء حساب المدير
const adminEmail = 'admin1@example.com'
const exists = await User.findOne({ email: adminEmail })
if(!exists){
  const passwordHash = await bcrypt.hash('admin123A', 10)
  await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' })
}

// التحقق من دور المدير
export function requireRole(role){
  return (req, res, next) => {
    if(req.user.role !== role) return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}
```

## 5. كيف ربطنا عملنا بقاعدة البيانات؟

**ربط قاعدة البيانات:**
- **MongoDB:** قاعدة بيانات NoSQL مرنة
- **Mongoose ODM:** للتعامل مع MongoDB بطريقة سهلة
- **نماذج البيانات:** تعريف schemas للبيانات
- **اتصال تلقائي:** عند بدء الخادم

```javascript
// اتصال قاعدة البيانات
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/lapgenius'
mongoose.connect(MONGO_URL).then(()=>{
  app.listen(PORT, ()=> console.log(`API listening on http://localhost:${PORT}`))
})

// نموذج المستخدم
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' }
}, { timestamps: true })
```

## 6. كيف تأكدنا من أن إضافة أو حذف عنصر يؤدي إلى إضافته أو حذفه من قاعدة البيانات؟

**عمليات CRUD مع قاعدة البيانات:**
- **إضافة عنصر:** `Laptop.create(req.body)` - إنشاء مباشر في قاعدة البيانات
- **تحديث عنصر:** `Laptop.findByIdAndUpdate()` - تحديث مباشر
- **حذف عنصر:** `Laptop.findByIdAndDelete()` - حذف مباشر
- **التزامن:** استخدام hooks للتحميل التلقائي بعد العمليات

```javascript
// إضافة لابتوب جديد
router.post('/', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.create(req.body)
  res.status(201).json(doc)
})

// تحديث لابتوب
router.put('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(doc)
})

// حذف لابتوب
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  await Laptop.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
```

## 7. كيف جعلنا حالة الطلب تتغير بعد موافقة المدير؟

**تحديث حالة الطلب:**
- **واجهة المدير:** أزرار لتغيير الحالة (جديد، قيد المعالجة، مكتمل، ملغي)
- **API endpoint:** `PUT /order/:id` لتحديث حالة الطلب
- **التحقق من الصلاحيات:** middleware للتحقق من دور المدير
- **التحديث المباشر:** استخدام `findByIdAndUpdate()`

```javascript
// تحديث حالة الطلب من واجهة المدير
const updateStatus = async (id, status)=>{
  try{
    setBusyId(id)
    await updateOrder(id, { status })
    await refresh()
  }catch(e){
    alert(`خطأ أثناء تحديث الحالة: ${e.message || e}`)
  }finally{
    setBusyId(null)
  }
}

// API endpoint لتحديث الطلب
router.put('/:id', requireAuth, async (req, res)=>{
  if(req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden - Admin role required' })
  }
  
  const doc = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(doc)
})
```

## 8. ما هي مقاطع الكود التي حققنا من خلالها ما سبق؟

### أ) نظام المصادقة والتشفير:
```javascript
// middleware/auth.js
export function requireAuth(req, res, next){
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
  req.user = payload
  next()
}

export function signToken(user){
  const payload = { id: user._id.toString(), email: user.email, role: user.role }
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
}
```

### ب) اتصال قاعدة البيانات:
```javascript
// server.js
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/lapgenius'
mongoose.connect(MONGO_URL).then(()=>{
  app.listen(PORT, ()=> console.log(`API listening on http://localhost:${PORT}`))
})
```

### ج) عمليات CRUD للابتوبات:
```javascript
// routes/laptops.js
router.post('/', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.create(req.body)
  res.status(201).json(doc)
})

router.put('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  const doc = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(doc)
})

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res)=>{
  await Laptop.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
```

### د) إدارة حالة الطلبات:
```javascript
// pages/admin/Orders.jsx
const updateStatus = async (id, status)=>{
  try{
    setBusyId(id)
    await updateOrder(id, { status })
    await refresh()
  }catch(e){
    alert(`خطأ أثناء تحديث الحالة: ${e.message || e}`)
  }finally{
    setBusyId(null)
  }
}

// routes/orders.js
router.put('/:id', requireAuth, async (req, res)=>{
  if(req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden - Admin role required' })
  }
  const doc = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(doc)
})
```

### هـ) إنشاء حساب المدير:
```javascript
// scripts/seed.js
const adminEmail = 'admin1@example.com'
const exists = await User.findOne({ email: adminEmail })
if(!exists){
  const passwordHash = await bcrypt.hash('admin123A', 10)
  await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' })
  console.log('Created admin admin1@example.com / admin123A')
}
```

### و) تحسينات الأداء:
```javascript
// server.js
app.use((req, res, next)=>{
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', 'no-store')
  next()
})

// client.js
if(method === 'GET'){
  const sep = fullUrl.includes('?') ? '&' : '?'
  fullUrl = `${fullUrl}${sep}_ts=${Date.now()}`
}
```

هذه المقاطع الكودية تمثل الأساس التقني لنظام LapGenius وتوضح كيفية تحقيق جميع المتطلبات المذكورة في الأسئلة.
