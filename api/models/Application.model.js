const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const applicationSchema = new Schema({
  applicantName: String,
  date: String,
  skills: Array,
  portfolio: String,
});
// presuming the portfolio thing is a link.
module.exports = mongoose.model("Application", applicationSchema);
