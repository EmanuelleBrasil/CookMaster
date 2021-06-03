const status = require('../status');
const { recipeService } = require('../services');

const addRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const { user } = req;
    const response = await recipeService.createRecipe(recipe, user);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.CREATED).json({ recipe: response });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.status(status.OK).json(recipes);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await recipeService.findRecipeById(id);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.OK).json(response);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updateRecipe = { ...req.body, id };

    const response = await recipeService.updateRecipeById(updateRecipe);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.OK).json(response);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const addRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const image = `localhost:300/images/${filename}`;
    const updateRecipe = { id, image };

    const response = await recipeService.updateRecipeById(updateRecipe);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.OK).json(response);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await recipeService.deleteRecipeById(id);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.DELETED).send();
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};