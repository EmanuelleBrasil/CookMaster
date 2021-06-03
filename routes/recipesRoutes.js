const express = require('express');
const { recipeController } = require('../controllers');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const RECIPE_ID_ROUTE = '/recipes/:id';

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes', tokenValidationMiddleware, recipeController.addRecipe);
recipesRoutes.get(RECIPE_ID_ROUTE, recipeController.getRecipeById);
recipesRoutes.get('/recipes', recipeController.getAllRecipes);
recipesRoutes.put(RECIPE_ID_ROUTE, tokenValidationMiddleware, recipeController.editRecipe);
recipesRoutes.delete(RECIPE_ID_ROUTE, tokenValidationMiddleware, recipeController.deleteRecipe);

module.exports = recipesRoutes;
