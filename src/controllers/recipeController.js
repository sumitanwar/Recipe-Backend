const recipeColl = require("../models/recipe");
const cloudinary = require("cloudinary").v2;
const ApiSearch = require("../utils/apiSearch");
const { cloudinaryImg } = require("../utils/cloudinary");
// cloudinary configration
cloudinary.config({
  cloud_name: "dhob4oruk", // my cloud name from cloudinary account
  api_key: "481398383545777", // my api_key from cloudinary account
  api_secret: "yvbqbmVZahHSuCaFlE0eZ-bLlwc", // my api_sercret from cloudinary account
  secure: true,
});
//Creating Recipe
exports.createRecipe = async (req, res, next) => {
  req.body.user = req.user._id;

  // getting file from frontEnd with name of recipe_img
  const file = req.files.recipe_img;

  // uploading image to cloudinary
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    // console.log(result);
    const imageData = {
      url: result.url,
      imgname: result.original_filename + "." + result.format,
    };
    req.body.image = imageData;
    const recipe = await recipeColl.create(req.body);
    recipe
      .save()
      .then(() => {
        console.log("Post saved Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
    // console.log(req.body.user)
    // const recipe = await recipeColl.create(req.body);
    const totalRecipe = await recipeColl.countDocuments();
    try {
      res.status(200).json({ success: true, recipe });
    } catch (err) {
      res
        .status(401)
        .json({ success: false, message: err.message, totalRecipe });
    }
  });
};

// getting all recipe
exports.getAllRecipe = async (req, res, next) => {
  const apiSearch = new ApiSearch(recipeColl.find(), req.query).Search();
  const recipes = await apiSearch.query;
  const totalRecipe = await recipeColl.countDocuments();
  try {
    res.status(200).json({ success: true, recipes, totalRecipe });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
// getting Single recipe
exports.getSingleRecipe = async (req, res, next) => {
  const recipe = await recipeColl.findOne(req.params.id);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: `No Recipe Found With Id: ${req.params.id}`,
    });
  }
  try {
    res.status(200).json({ success: true, recipe });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
// Updating recipe---Authenticated User Only
exports.upDateRecipe = async (req, res, next) => {
  const { productId } = req.body;
  const UpdatedRecipe = req.body;
  const recipes = await recipeColl.findByIdAndUpdate();
};

// Delete Recipe----Authenticated User Only
exports.DeleteRecipe = async (req, res, next) => {};
