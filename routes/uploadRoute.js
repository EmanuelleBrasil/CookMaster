const express = require('express');
const multer = require('multer');
const { recipeController } = require('../controllers');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const uploadRoute = express.Router();

uploadRoute.use(express.static(`${__dirname}/uploads/`));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
},
filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
},
});

const upload = multer({ storage });

uploadRoute.post('/recipes/:id/image',
  [tokenValidationMiddleware, upload.single('image')],
  recipeController.addRecipeImage);

module.exports = uploadRoute;