const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const applicationSchema = new Schema({
  applicantName: String,
  date: Date.now(),
  skills: Array,
  portfolio: String, // presuming its a link.
});

module.exports = mongoose.model("Application", applicationSchema);
