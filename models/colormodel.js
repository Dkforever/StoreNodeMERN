const mongoose = require("mongoose");

const allcolorSchema = mongoose.Schema({

  
colorname:{
    type:String,
    unique:[true,"Color already exist"]


},

    


});

module.exports = mongoose.model("Color", allcolorSchema);
