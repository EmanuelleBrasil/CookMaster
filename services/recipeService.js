const { recipeModel } = require('../models');
const { emptyOrUdefined } = require('../utils');
const status = require('../status');

const verifyEntries = (recipe) => {
  if (emptyOrUdefined(recipe.name)
  || emptyOrUdefined(recipe.ingredients)
  || emptyOrUdefined(recipe.preparation)) return false;
  return true;
};

const invalidEntries = {
  err: 'Invalid entries. Try again.',
  err_code: status.INVALID_ENTRIES,
};

const createRecipe = async (recipe, user) => {
  if (!verifyEntries(recipe)) {
    return invalidEntries;
  }

  const createdRecipe = await recipeModel.create({ ...recipe, userId: user.id });
  return createdRecipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const recipeNotFound = {
  err: 'recipe not found',
  err_code: status.NOT_FOUND,
};
const findRecipeById = async (id) => {
  const recipe = await recipeModel.findById(id);
  if (recipe === null) return recipeNotFound;
  return recipe;
};

const updateRecipeById = async (updatedRecipe) => {
  await recipeModel.update(updatedRecipe);
  const { id } = updatedRecipe;

  const recipe = await recipeModel.findById(id);
  if (recipe === null) return recipeNotFound;
  return recipe;
};

const deleteRecipeById = async (id) => {
  const response = await recipeModel.deleteRecipe(id);
  if (response === null) return recipeNotFound;
  return response;
};

module.exports = {
  createRecipe,
  getRecipes,
  findRecipeById,
  updateRecipeById,
  deleteRecipeById,
};