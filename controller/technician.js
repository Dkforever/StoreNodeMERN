
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Technician = require("../models/technicianmodel");
const sendToken = require("../utils/jwToken")
//const sendEmail = require("../utils/sendEmail");
//const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerTechnician = catchAsyncErrors(async (req, res, next) => {
   
  
    const { name, email, password ,role,address, city,phone} = req.body;

    let images = req.files.images.tempFilePath;

   let mycloud = await cloudinary.v2.uploader.upload(images,{ folder: "tehnician", });  // to upload file on Cloudinary
 
  
    const technician = await Technician.create({
      name,
      email,
      password,
      role,
      address,
      city,
      phone,

      images: {
        public_id:mycloud.public_id, // it will change to mycloud.public_id
        url: mycloud.secure_url, //  mycloud.secure_url
       },
    });
    sendToken(technician, 201, res);
    
  
  });

 // Update Store 

 exports.updateTechnician = catchAsyncErrors(async (req, res, next) => {
  let technician = await Technician.findById(req.params.id);

  if (!technician) {
    return next(new ErrorHandler("Technician  not found", 404));
  }

   // Images Start Here to check
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(technician.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "stores",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

technician = await Technician.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
  useFindAndModify: false,
});

res.status(200).json({
  success: true,
  technician,
});
});





  // Login User
exports.loginTechnician = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const technician = await Technician.findOne({ email }).select("+password");

  if (!technician) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await technician.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(technician, 200, res);
});



// Logout user/technician
exports.logouttechnician = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });


// Delete Technician  
exports.deleteTechnician = catchAsyncErrors(async (req, res, next) => {
  const technician = await Technician.findById(req.params.id);

  if (!technician) {
    return next(new ErrorHandler("Technician does not exist", 404));
  }

  await technician.remove();

  res.status(200).json({
    success: true,
    message: "technician  Deleted Successfully",
  });
});
