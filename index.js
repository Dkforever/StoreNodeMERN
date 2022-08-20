const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const cors = require("cors");

//const list_end_points = require("list_end_points");


dotenv.config({
  path: "./config/config.env",
});
app.use(cors());

//list_end_points(app);


connectDatabase();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
