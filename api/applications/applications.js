const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/:application", (req, res) => {
  // allow user to check the status of his application to a project
});

router.post("/:application", (req, res) => {
  //
});

router.post("/project/:applicant", (req, res) => {
  // route allows applicant to put their app into the project for consideration
});

router.delete("/project/:applicant", (req, res) => {
  // delete a applicant from a project
});

module.exports = router;
