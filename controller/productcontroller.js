const Product = require("../models/products");
const Admin = require("../models/admin");
const cloudinary = require("cloudinary");
//const fs = require("fs");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create product cloudinary image
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  

  const admin = {admin:req.admin._id}; // to add admin id in product

    const { name, modelname,modelList,price,stock,category,description,color,sub_category,sub_subcategory,productcode,modelattribute,tags} = req.body;
    let images = req.files.images.tempFilePath;

     let mycloud = await cloudinary.v2.uploader.upload(images,{ folder: "product", });  // to upload file on Cloudinary

   // fs.rmSync("./tmp", { recursive: true });  // this is to delete the file and TMP folder from server after uploading on Clodinary
  

    const products = await Product.create({
     name,
     price,
     category,
     sub_category,
     sub_subcategory,
     description,
     color,
     stock,
      productcode,
      modelattribute,
      tags,
      modelname,
    
   admin:req.admin._id,  // to add admin id in product
   //  modelList:modelList,

      images: {
        public_id:mycloud.public_id, // it will change to mycloud.public_id
        url: mycloud.secure_url, //  mycloud.secure_url
       },
    });
    res.status(201).json({ succuess: true, products });
  
});

exports.addModel = async (req, res, next) => {
  let product = await Product.findOneAndUpdate(
    {
      name: req.body.name,
    },

    {
      $push: {modelList: req.body.modelList },
    }
  );

  res.status(200).json({ message: "model added successfully", product });
};

exports.getallProducts =catchAsyncErrors (async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});




exports.getProductDetail =catchAsyncErrors (async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.status(200).json({ products });
});


exports.getProduct = (req, res) => {
  res.status(200).json({ message: "routre is working fine" });
};

// to find all modelse by Name body

exports.getallModel = catchAsyncErrors(async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json({ message: "Please provide a name" });

  const products = await Product.find({ name }).select({
    modelList: 1,
  });
  res.status(200).json({ products });
});

//to find basend on Model name and color

exports.getmodelname = async (req, res, next) => {
  //  const  products = await Product.find({name:req.body.name, modelList:req.body.modelList}).select("modelList");

  //  const  modelname  = req.body;

  // const products =await Product.find();

  // find Modelname which is under modelList
  // const products = await Product.find({modelList: {$elemMatch: {modelname:req.body.modelname}}});
  // find Modelname which is under modelList

  const products = await Product.find({
    modelList: {
      $elemMatch: { modelname: req.body.modelname, color: req.body.color },
    },
  });

  //  const products = await Product.find({name:req.body.name}).select(modelList:"modelname");
  //   const products = await Product.find({modelList:{$modelname1:req.body.modelname}});
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ products });
  console.log(products);
};




// Update Product Details

exports.updateproduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Campaing  is not available", 404));
  }

 
product = await Product.findByIdAndUpdate(req.params.id, req.body);

res.status(200).json({
  success: true,
  product,
});
});






// Delete Product   fix
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});


exports.allcategory = catchAsyncErrors(async (req, res, next) => {
const products = await Product.find()
res.status(200).json({ products });
});
