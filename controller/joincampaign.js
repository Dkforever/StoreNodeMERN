
const Product = require ("../models/products")
const Campaign  = require('../models/campaignModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Joincamp = require('../models/joincampaignmodel');


//  add new join
exports.newjoin = catchAsyncErrors(async (req, res, next) => {
  const {
    campaignItems,
    customer,
  } = req.body;

  const joincamp = await Joincamp.create({

    campaignItems,
      customer, 
    paidAt: Date.now(),
  //  customer: req.customer._id,
  });

  res.status(201).json({
    success: true,
    joincamp,
  });
});







// get Single Campagin Joined details by admin or tehnician
exports.getjoinedcampDetail = catchAsyncErrors(async (req, res, next) => {
   
//  const  campaignItems = await Joincamp.findById(req.params.id).populate(
//     "product",
//     "name price description"
//   );


  const joined= await Joincamp.findById(req.params.id).populate(
    "customer",
    "name email phone"
  );

  if (!joined) {
    return next(new ErrorHandler(" no one joined with this Id", 404));
  }

  res.status(200).json({
    success: true,
    joined,
  });

});



// get all Joined campaign -- Admin
exports.getAlljoinedcamp = catchAsyncErrors(async (req, res, next) => {
  const joincamp = await Joincamp.find();


  res.status(200).json({
    success: true,
    joincamp,
  });
});

