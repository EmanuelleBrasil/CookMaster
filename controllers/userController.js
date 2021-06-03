const status = require('../status');
const { userService } = require('../services');

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const response = await userService.createUser(user);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.CREATED).json({ user: response });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addUser,
};
