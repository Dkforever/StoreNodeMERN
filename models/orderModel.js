const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 
  // store:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Store",
  // },


  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // images: {
      //   type: String,
      //   required: true,
      // },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  
   paymentInfo: {
    id: {
       type: String,
       required: true,
     },
     status: {
       type: String,
        default: "pending",
     },
     },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 20,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 10,
  },

 totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
 
});

module.exports = mongoose.model("Order", orderSchema);