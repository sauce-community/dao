const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  externalId: Number,
  name: String,
  description: String,
  projectOwner: String,
  members: [{ type: String }],
  applicants: [{ type: String }],
  signatures: [{ type: String }],
  createdOn: Date,
});

module.exports = mongoose.model("Project", projectSchema);
