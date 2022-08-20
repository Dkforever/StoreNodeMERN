const Brand = require("../models/brand");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");







// create New Campaign
exports.createBrand = catchAsyncErrors(async (req, res, next) => {

    const {brandname, modelList } = req.body;

 
  const brand = await Brand.create(
    {
        brandname,
        modelList: {
          modelname: modelList,
        },
    
           //  modelList,
  });
  res.status(201).json({succuess:true,brand});
});


exports.addnewmodel = async (req, res, next) => {
    let brand = await Brand.findOneAndUpdate(
      {
        brandname: req.body.brandname,
        
      },
  
      {
        $push: {modelList:{ modelname: req.body.modelList }},
      }
    );
  
    res.status(200).json({ message: "model added successfully",brand });
  };


  //  Remove a model
  
exports.removemodel = async (req, res, next) => {
    let brand = await Brand.findOneAndUpdate(
      {
        brandname: req.body.brandname,
        
      },
  
      {
        $pull:{modelList:{ modelname: req.body.modelList }},
      }
    );
  
    res.status(200).json({ message: "model removeed successfully",brand });
  };


  

//find or Get list of all Brands
  exports.brandList = catchAsyncErrors(async(req,res,next)=>{
    const brand = await Brand.find()
    return res.status(200).json({brand})
  });

 

// get list all model of specific brand
  exports.brandModel = catchAsyncErrors(async(req,res,next)=>{
    const brand= await Brand.findById(req.params.id)
    if(!brand)
    {
        return next(new ErrorHandler(" Brand not Found",404))
    }
    return res.status(200).json({
        success:true,
        brand });
  });




  
 




// Delete categories list

// exports.deleteBrand = catchAsyncErrors(async (req, res, next) => {
//     const brand = await Brand.findById(req.params.id);
  
//     if (!brand) {
//       return next(new ErrorHandler("Campaign not found", 404));
//     }
  
//     await brandname.remove();
  
//     res.status(200).json({
//       success: true,
//       message: "brand Deleted Successfully",
//     });
//   });


  exports.addBrand = async (req, res, next) => {
    let brand = await Brand.findOneAndUpdate(
      {
        name: req.body.category,
        name: req.body.sub_category,
        name: req.body.sub_subcategory,
      },
  
      {
        $push: {category: req.body.category , sub_category: req.body.sub_category, sub_subcategory: req.body.sub_subcategory},
      }
    );
  
    res.status(200).json({ message: "category added successfully", brand });
  };
 

