const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: String,
  applications: Array, // arr so s/he can have multiple applications. will be a one to many relationship
});

// export
