const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const customerSchema =  mongoose.Schema({
    firstname: {
        type: String,
        maxLength: [30, "Name cannot exceed 30 characters"],
      },

      lastname: {
        type: String,
        maxLength: [30, "Name cannot exceed 30 characters"],
        
      },

      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String, 
      },

      province: {
        type: String,
      },

      phone: {
        type:Number,
       required: [true, "Please Enter Your Phone Number"],
        unique: true,    
      },

    location: {
        type:{
          type: String,
        enum:['Point'],
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
    },
    },


      city: {
        type: String,
      },
      postalcode: {
        type: String,
      },

      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

      couponcode:{
        type:Number,
      },

      couponused: {
        type: Boolean,
        default: false,
    },

});


// bcrypt 
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN
customerSchema.methods.getJWTToken = function () {
  return jwt.sign({id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password

customerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("Customer", customerSchema);