const Categories = require("../models/allcategorie");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");





// create New Campaign
exports.createCategories = catchAsyncErrors(async (req, res, next) => {

    const { category, sub_category, sub_subcategory } = req.body;

  const categories = await Categories.create(
    {
        category,
        sub_category,
        sub_subcategory

    
  });
  res.status(201).json({succuess:true, categories});
});





//find or Get list of all Category
  exports.categoryList = catchAsyncErrors(async(req,res,next)=>{
    const categories = await Categories.find()
    return res.status(200).json({categories})
  });

  





  // Update Category 

  exports.updateCategories = catchAsyncErrors(async (req, res, next) => {
    let categories = await Categories.findById(req.params.id);
  
    if (!categories) {
      return next(new ErrorHandler("Category  is not available", 404));
    }
  
   
  categories = await Categories.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    categories,
  });
});



// Delete categories list

exports.deleteCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Categories .findById(req.params.id);
  
    if (!categories) {
      return next(new ErrorHandler("Campaign not found", 404));
    }
  
    await categories.remove();
  
    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  });


  
 

