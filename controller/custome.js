const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Customer = require("../models/customermodel");

const sendToken = require("../utils/jwToken");
const { sendMail } = require("../utils/sendEmail");


exports.registerCustomer = async (req, res, next) => {

  const { firstname, lastname,email,password, phone,province,city,postalcode,role, location } = req.body;
  
  let customer = await Customer.findOne({ email });
  if (customer) {
      return res.status(400).json({ success: false, message: "User already exists" });
   }


  const couponcode = Math.floor(Math.random() * 1000000);

   customer = await Customer.create({
    firstname,
    lastname,
    email,
    password,
    phone,
    province,
    city,
    postalcode,
    couponcode,
    role,
 location:{
      coordinates:[
        req.body.longitude,
        req.body.latitude
      ]
    }

  });

  await sendMail (email, "cuopon code is send ", `Your OTP is ${couponcode}`);
  res.status(201).json({succuess:true, customer});
};


// Login User

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const customer = await Customer.findOne({ email }).select("+password");

  if (!customer) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await customer.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }


  sendToken(customer, 200, res);
});



// logout user/customer
exports.logoutCustomer = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});



//find or Get list of all users
exports.getallUsers = async(req,res,next)=>{
  const customer = await Customer.find({role:("user")})
  return res.status(200).json({customer})
}




//find or Get list of all users
exports.getallTechnician = async(req,res,next)=>{
  const customer = await Customer.find({role:("technician")});
  return res.status(200).json({customer})
}

// get Single user detail by id
exports.getuserDetail = catchAsyncErrors(async(req,res,next)=>{
  const customer = await Customer.findById(req.params.id)
  if(!customer)
  {
      return next(new ErrorHandler("Store not Found",404))
  }
  return res.status(200).json({
      success:true,
      customer });
});

// update User By id

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorHandler("Product not found", 404));
  }
  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    customer,
  });
});




exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new ErrorHandler("Store not found", 404));
  }

  // // Deleting Images From Cloudinary
  // for (let i = 0; i < store.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(store.images[i].public_id);
  // }

  await customer.remove();

  res.status(200).json({
    success: true,
    message: "user Deleted Successfully",
  });
});




// Validate Coupon Code

exports.validateCoupon = async (req, res) => {
  try {
    const couponcode = Number(req.body.couponcode);

    const customer = await Customer.findById(req.params.id);

    if (customer. couponcode!== couponcode ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Coupon or has been Expired" });
    }

    customer.couponused = true;
    customer.couponcode = null;
    //user.otp_expiry = null;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "coupon Verifeid Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};