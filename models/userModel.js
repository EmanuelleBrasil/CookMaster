const connect = require('../configuration/connection');
// const { ObjectId } = require('mongodb');

const create = async (user) => {
  const createdUser = await connect().then((db) =>
    db.collection('users').insertOne(user));
  return createdUser.ops[0];
};

const countByEmail = async (userEmail) => {
  const userQuantity = await connect().then((db) =>
  db.collection('users').countDocuments({ email: userEmail }));
  return userQuantity;
};
const findByEmail = async (userEmail) => {
  const user = await connect().then((db) =>
  db.collection('users').findOne({ email: userEmail }));
  return user;
};

module.exports = {
  create,
  countByEmail,
  findByEmail,
};