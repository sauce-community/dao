const { string } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const proposalSchema = new Schema({
  externalId: Number,
  proposalName: String,
  description: String,
  authorAddress: String,
  voteProgress: Number, // store vote progress as a number / 100
  createdOn: Date,
});

module.exports = mongoose.model("Proposal", proposalSchema);
