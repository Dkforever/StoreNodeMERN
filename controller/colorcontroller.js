const Color = require("../models/colormodel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");







// create New Color
exports.createColor = catchAsyncErrors(async (req, res, next) => {

    const {colorname } = req.body;

 
  const color= await Color.create(
    {
        colorname
  });
  res.status(201).json({succuess:true,color});
});



  

  

//find or Get list of all color
  exports.colorList = catchAsyncErrors(async(req,res,next)=>{
    const color = await Color.find()
    return res.status(200).json({color})
  });

 


  // Update color

  exports.updateColor = catchAsyncErrors(async (req, res, next) => {
    let color = await Color.findById(req.params.id);
  
    if (!color) {
      return next(new ErrorHandler("brand  is not available", 404));
    }
  
   
  color = await Color.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    color,
  });
});



// Delete Color list

exports.deleteColor = catchAsyncErrors(async (req, res, next) => {
    const color = await Color .findById(req.params.id);
  
    if (!color) {
      return next(new ErrorHandler("Campaign not found", 404));
    }
  
    await color.remove();
  
    res.status(200).json({
      success: true,
      message: "Color Deleted Successfully",
    });
  });


 

