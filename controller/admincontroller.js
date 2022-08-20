const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Admin = require("../models/admin");
const sendToken = require("../utils/jwToken");
//const sendEmail = require("../utils/sendEmail");
//const crypto = require("crypto");
//const cloudinary = require("cloudinary");

exports.registerAadmin = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, password, role } = req.body;

  const admin = await Admin.create({
    name,
    email,
    password,
    role,

    //   avatar: {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   },
  });
  sendToken(admin, 201, res);
});

// Login User
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }


  sendToken(admin, 200, res);
});


exports.adminLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
