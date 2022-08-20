const mongoose = require("mongoose");

const allbrandSchema = mongoose.Schema({

  
brandname:{
    type:String,


},
modelList:[{
    modelname:{
        type:String,
    }
    
}],


});

module.exports = mongoose.model("Brand", allbrandSchema);
