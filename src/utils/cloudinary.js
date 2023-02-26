const cloudinary = require("cloudinary").v2;

// cloudinary configration
cloudinary.config({
  cloud_name: "dhob4oruk", // my cloud name from cloudinary account
  api_key: "481398383545777", // my api_key from cloudinary account
  api_secret: "yvbqbmVZahHSuCaFlE0eZ-bLlwc", // my api_sercret from cloudinary account
  secure: true,
});
// uploading image to cloudinary
exports.cloudinaryImg = async (file) => {
  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    return result;
  });
};
