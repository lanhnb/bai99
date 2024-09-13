const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  
  { orderItems: [
    {
      slug: { type: String, required: false },
      name: { type: String, required: true },
      quantity: { type: Number, required: false },
      
      price: { type: Number, required: true },
      products:[],
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone:{type: String, required: true },
   
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  
    },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
