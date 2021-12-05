const config = require("../config.json");
const mongoose = require("mongoose");

mongoose.connect(config.localConnect, connectionOptions);

module.exports = {
  User: require("../models/User.model"),
  Application: require("../models/Application.model"),
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
