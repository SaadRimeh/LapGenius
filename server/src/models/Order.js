import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  laptop: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
  quantity: { type: Number, default: 1 },
  priceAtPurchase: { type: Number, required: true }
}, { _id: true })

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' },
  total: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)


