const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  applications: [{ type: String }], // arr so s/he can have multiple applications. an array of ids
});

// export
module.exports = mongoose.model("User", userSchema);
