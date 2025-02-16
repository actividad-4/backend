import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id
  }
})

//Definimos el esquema y creamos el modelo basado en el esquema.
export const ProductModel = mongoose.model('Product', productSchema);