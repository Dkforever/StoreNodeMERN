const mongoose = require("mongoose");

const joincampSchema = new mongoose.Schema({

  // store:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Store",
  // },


  campaignItems: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      campaignid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      discount: {
        type: "String",
      },
      discountprice: {
        type: Number,
      },
      stock: {
        type: Number,
      },
    
    },
  ],


  //   customer_Status: {
  //     type: String,
  //     required: true,
  //     default: "processing",
  //   },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },

});

module.exports = mongoose.model("Joincamp", joincampSchema);