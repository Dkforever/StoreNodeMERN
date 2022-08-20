const express = require("express");
 const app = express();
 const fileUpload = require("express-fileupload");
 const cors = require("cors");
 const errorMiddleware = require("./middleware/error");
 const cookieParser = require("cookie-parser");
 const bodyParser = require("body-parser");

 app.use(express.json());
 app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        useTempFiles: true,
      
    }));

 //routers
 const product = require("./routers/products");
 


 app.use (cors());
 
 app.use(errorMiddleware);
 app.use(express.urlencoded({
     extended:true
     }))
app.use("/api/v1", product);


module.exports = app;