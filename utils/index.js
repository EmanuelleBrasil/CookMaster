const emptyOrUdefined = (value) => {
  if (value === undefined || value === '') return true;
  return false;
};

module.exports = {
  emptyOrUdefined,
};
