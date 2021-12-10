const { string } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
  externalId: Number,
  name: String,
  description: String,
  createdAt: Date,
  projectOwner: String,
  members: [{ type: String }],
  applicants: [{ type: String }],
  signatures: [{ type: String }],
});

module.exports = mongoose.model("Project", projectSchema);
