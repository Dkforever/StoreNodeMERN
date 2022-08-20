const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
//const crypto = require("crypto"); hi


const technicianSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
      },
      role: {
        type: String,
        default: "technician",
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

    location: {
      long: {
        type: Number,
      },
      lat: {
        type: Number,
      },
    },


      images: [
        {
          public_id: String,
          required: false,
          url: String,
        },
      ],

      

      createdAt: {
        type: Date,
        default: Date.now,
      },

});





 technicianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
technicianSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password

technicianSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model("Technician", technicianSchema);