const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({

  
  category:{
     
      type:String,
    
  
  },

  sub_category:{
    type: String,
  },

 sub_subcategory:{
    type: String,
  },

});

module.exports = mongoose.model("Categories", categoriesSchema);
