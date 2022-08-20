const mongoose = require('mongoose');
const validator = require("validator");
//const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const adminSchema =  mongoose.Schema({
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
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

});





 adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
adminSchema.methods.getJWTToken = function () {
  return jwt.sign({id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model("Admin", adminSchema);