import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Laptop from '../models/Laptop.js'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/lapgenius'

async function run(){
  await mongoose.connect(MONGO_URL)
  console.log('Connected to Mongo')

  const adminEmail = 'admin1@example.com'
  const exists = await User.findOne({ email: adminEmail })
  if(!exists){
    const passwordHash = await bcrypt.hash('admin123A', 10)
    await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' })
    console.log('Created admin admin1@example.com / admin123A')
  } else {
    console.log('Admin already exists')
  }

  const samples = [
    { name: 'Acer Swift 3', brand: 'Acer', price: 899, stock: 5, specs: { cpu: 'i5', ram: '16GB', ssd: '512GB' } },
    { name: 'Lenovo ThinkPad X1', brand: 'Lenovo', price: 1499, stock: 3, specs: { cpu: 'i7', ram: '16GB', ssd: '1TB' } },
    { name: 'HP Envy 13', brand: 'HP', price: 1099, stock: 4, specs: { cpu: 'i7', ram: '16GB', ssd: '512GB' } }
  ]
  const count = await Laptop.countDocuments()
  if(count === 0){
    await Laptop.insertMany(samples)
    console.log('Inserted sample laptops')
  } else {
    console.log('Laptops already present')
  }

  await mongoose.disconnect()
  console.log('Done')
}

run().catch(err=>{ console.error(err); process.exit(1) })


