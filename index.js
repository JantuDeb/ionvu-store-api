const app = require("./app");
const cloudinary = require("cloudinary");
require("dotenv").config();


//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(process.env.PORT || port, () => {
  console.log(`API LISTENING ON PORT ${process.env.PORT}`);
});
