const Store = require("../models/sotres")
const cloudinary = require("cloudinary")
const fs = require("fs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");





// create product cloudinary image
exports.createstore = catchAsyncErrors(async (req, res,next)=> {
  
      const store = await Store.create(req.body);
   
    res.status(201).json({succuess:true, store});
   
});


//find or Get list of all store 
  exports.getallStore = async(req,res,next)=>{
    const store = await Store.find()
    return res.status(200).json({store})
  }

  
// find Single Store using ID

exports.getStoreDetail = catchAsyncErrors(async(req,res,next)=>{
    const store = await Store.findById(req.params.id)
    if(!store)
    {
        return next(new ErrorHandler("Store not Found",404))
    }
    return res.status(200).json({
        success:true,
        store });
  });


  // Update Store 

  exports.updateStore = catchAsyncErrors(async (req, res, next) => {
    let store = await Store.findById(req.params.id);
  
    if (!store) {
      return next(new ErrorHandler("Product not found", 404));
    }

     // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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

  store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    store,
  });
});



// Delete Product one by param id 

exports.deleteStore = catchAsyncErrors(async (req, res, next) => {
    const store = await Store.findById(req.params.id);
  
    if (!store) {
      return next(new ErrorHandler("Store not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < store.images.length; i++) {
      await cloudinary.v2.uploader.destroy(store.images[i].public_id);
    }
  
    await store.remove();
  
    res.status(200).json({
      success: true,
      message: "Store Deleted Successfully",
    });
  });





