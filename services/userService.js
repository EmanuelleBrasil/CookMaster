const emailValidator = require('email-validator');
const { userModel } = require('../models');
const { emptyOrUdefined } = require('../utils');
const status = require('../status');

const ZERO = 0;
const verifyRegisteredEmail = async (email) => {
  const registeredEmail = await userModel.countByEmail(email);
  if (registeredEmail > ZERO) return true;
  return false;
};
const verifyEntries = (user) => {
  if (emptyOrUdefined(user.name)
  || emptyOrUdefined(user.email)
  || emptyOrUdefined(user.password)
  || !emailValidator.validate(user.email)) return false;
  return true;
};

const invalidEntries = {
  err: 'Invalid entries. Try again.',
  err_code: status.INVALID_ENTRIES,
};

const alreadyRegistered = {
  err: 'Email already registered',
  err_code: status.ALREADY_REGISTERED, 
};

const createUser = async (user) => {
  if (!verifyEntries(user)) {
    return invalidEntries;
  }

  const registeredEmail = await verifyRegisteredEmail(user.email);

  if (registeredEmail) {
    return alreadyRegistered;
  }
  const createdUser = await userModel.create({ ...user, role: 'user' });
  return createdUser;
};

module.exports = {
  createUser,
};
