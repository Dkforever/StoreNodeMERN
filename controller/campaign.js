const Campaign = require("../models/campaignModel");
const Product = require("../models/products");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");

// create New Campaign
exports.createCampaign = catchAsyncErrors(async (req, res, next) => {
  // const admin = {admin:req.admin._id}; // to add admin id in product
  const admin = { admin: req.admin._id };

  // let product = {product:req.product._id};
  const { title, description, requirements, productitems, status } = req.body;

  if (req.files === null)
    return res.status(400).json({ msg: "No file uploaded" });

  let images = req.files.images.tempFilePath;

  // let mycloud = await cloudinary.v2.uploader.upload(images,{ folder: "product", });  // to upload file on Cloudinary
  let mycloud = await cloudinary.v2.uploader.upload(images, {
    folder: "campaign",
  }); // to upload file on Cloudinary

  //fs.rmSync("./tmp", { recursive: true });  // this is to delete the file and TMP folder from server after uploading on Clodinary

  console.log(productitems);

  const campaign = await Campaign.create({
    title,
    description,
    requirements: JSON.parse(requirements),
    productitems: JSON.parse(productitems),
    status,
    //product:req.product._id,
    //product:req.product._id,
    admin: req.admin._id,

    images: {
      public_id: mycloud.public_id, // it will change to mycloud.public_id
      url: mycloud.secure_url, //  mycloud.secure_url
    },
  });
  res.status(201).json({ succuess: true, campaign });
});

//find or Get list of all Campaign
exports.getcampaignList = catchAsyncErrors(async (req, res, next) => {
  const campaign = await Campaign.find();
  return res.status(200).json({ campaign });
});

//  get Campaign Details

exports.campaignDetail = catchAsyncErrors(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    return next(new ErrorHandler("Campaign not Found", 404));
  }
  return res.status(200).json({
    success: true,
    campaign,
  });
});

// Update Campaign Details

exports.updateCampaign = catchAsyncErrors(async (req, res, next) => {
  let campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return next(new ErrorHandler("Campaing  is not available", 404));
  }

  campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    campaign,
  });
});

// Delete Product

exports.deleteCampaign = catchAsyncErrors(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return next(new ErrorHandler("Campaign not found", 404));
  }

  await campaign.remove();

  res.status(200).json({
    success: true,
    message: "Campaign Deleted Successfully",
  });
});

 // Create New Review or Update the review of Campaign
 exports.createCampaignReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, campaignId } = req.body;

  const review = {
   customer: req.customer._id,
   firstname: req.customer.firstname,
    rating: Number(rating),
    comment,
  };

  const campaign = await Campaign.findById(campaignId);
  
   const isReviewed = campaign.reviews.find(
     (rev) => rev.customer.toString() === req.customer._id.toString()
   );

  if (isReviewed) {
    campaign.reviews.forEach((rev) => {
      if (rev.customer.toString() === req.customer._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    campaign.reviews.push(review);
    campaign.numOfReviews = campaign.reviews.length;
  }

  let avg = 0;

  campaign.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  campaign.ratings = avg / campaign.reviews.length;

  await campaign.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


// Get All Reviews of a Campaign
exports.getCampaigntReviews = catchAsyncErrors(async (req, res, next) => {
  const campaign = await Campaign.findById(req.query.id);

  if (!campaign) {
    return next(new ErrorHandler("Campaign not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: campaign.reviews,
  });
});



// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const campaign = await Campaign.findById(req.query.campaignId);

  if (!campaign) {
    return next(new ErrorHandler("campaign not found", 404));
  }

  const reviews = campaign.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Campaign.findByIdAndUpdate(
    req.query.campaignId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});