import mongoose from 'mongoose'

const suggestionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  text: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Suggestion', suggestionSchema)


