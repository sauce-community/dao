const { string } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
  members: [{ type: String }],
  applicants: [{ type: String }],
  description: String,
  signatures: [{ type: String }],
});

module.exports = mongoose.model("Project", projectSchema);
