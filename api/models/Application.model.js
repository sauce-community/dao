const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Application = new Schema({
  applicantName: String,
  date: Date.now(),
  skills: Array,
  portfolio: String, // presuming its a link.
});

// export
