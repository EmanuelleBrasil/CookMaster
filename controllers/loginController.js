const status = require('../status');
const { loginService } = require('../services');

const userLogin = async (req, res) => {
  try {
    const login = req.body;
    const response = await loginService.loginValidation(login);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.OK).json({ token: response });
  } catch (err) {
  res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  userLogin,
};
