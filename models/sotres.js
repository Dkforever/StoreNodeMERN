const mongoose = require('mongoose');
const validator = require("validator");



const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Store Address"],
  },
city:{
    type: String,
    maxLength: [30, "City cannot exceed 30 characters"],
},

  phone: {
    type: Number,
    required: [true, "Please Enter Your Phone"],
    unique: true,
    maxLength: [12, "Phone cannot exceed 12 characters"],
    minLength: [4, "Phone should have more than 4 characters"],
  },

   email :{
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    maxLength:[30, "canot exceed More than 30 charater"]
   },


   location: {
     long: {
       type: Number,
     },
     lat: {
       type: Number,
     },
   },

   discount: {
     type: Number,
   },

   images: [{
    pubilc_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  }],


  // // should 

  // product: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],



  // brand: [{
  //   brand_id: {
  //     type: String,
  //   },
  // }],


  // // User can give review of sotre 
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  // Which admin created this store 
  // creater: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Admin",
  //   required: true,
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});








module.exports = mongoose.model("Store", storeSchema);