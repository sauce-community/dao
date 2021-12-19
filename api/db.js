const config = require("./config.json");
const mongoose = require("mongoose");

// mongoose.connect(, connectionOptions);
mongoose.connect(config.developmentDatabaseString);

module.exports = {
  User: require("./models/User.model"),
  Application: require("./models/Application.model"),
  Project: require("./models/Project.model"),
  Proposal: require("./models/Proposal.model"),
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
