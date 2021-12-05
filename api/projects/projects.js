const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/viewProject/:id", (req, res) => {
  let projectId = req.params.id;
});

router.get("/viewProject/applicants/:id", (req, res) => {
  // view list of applicants to a project
  let projectId = req.params.id;
  db.Project.findOne({ _id: projectId }).then((project) => {
    let projectApplicants = project.applicants;
    res.status(200).json(projectApplicants);
  });
});

router.post("/createProject/:id", async (req, res) => {
  let projectId = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let newProject = await db.Projects.create({ _id: projectId });
});

router.put("/updateProject/addApplicant", async (req, res) => {
  let projectId = req.body.id;
  let applicantToAdd = req.body.newApplicant;
  let projectToUpdate = await db.Project.findOne({ _id: projectId });
  projectToUpdate.applicants.push(applicantToAdd);
  projectToUpdate.save();
  res.status(200).send("successful update");
});

router.put("/updateProject/convertApplicantToMember", async (req, res) => {
  let projectId = req.body.id;
  let promotionTarget = req.body.promotionTarget;
  let projectToUpdate = await db.Project.updateOne(
    { _id: projectId },
    { $pullAll: { applicants: [promotionTarget] } }
  );
  projectToUpdate.members.push(promotionTarget);
  projectToUpdate.save();
  res.status(200).send("successful update");
});

module.exports = router;
