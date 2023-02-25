const { countDocuments } = require("../models/recipe");
const recipeColl = require("../models/recipe");
const ApiSearch = require("../utils/apiSearch");
const { uploadImage } = require("../utils/cloudinary");

//Creating Recipe
exports.createRecipe = async (req, res, next) => {
  req.body.user = req.user._id;
  const recipe = await recipeColl.create(req.body);
  const totalRecipe = await recipeColl.countDocuments();
  uploadImage();
  try {
    res.status(200).json({ success: true, recipe });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message, totalRecipe });
  }
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
