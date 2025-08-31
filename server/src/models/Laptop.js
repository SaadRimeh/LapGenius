import mongoose from 'mongoose'

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  
  description: { type: String },
  specs: { type: Object, default: {} },
  stock: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Laptop', laptopSchema)


