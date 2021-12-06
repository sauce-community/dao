const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/viewAllProjects/", (req, res) => {
  // get all projects in the db (all) and return them showing their data.
  db.Project.find({}).then((projects) => {
    res.status(200).json(projects);
  });
});

router.get("/viewProjectApplicants/:id", (req, res) => {
  // view list of all the project's applicants
  let projectId = req.params.id;
  db.Project.findOne({ _id: projectId }).then((project) => {
    let projectApplicants = project.applicants;
    res.status(200).json(projectApplicants);
  });
});

router.post("/createProject/:founder", async (req, res) => {
  // it takes a founder or founder(s) to make a project
  let founder = req.params.founder;
  let name = req.body.name;
  let description = req.body.description;
  let newProject = await db.Projects.create({
    _id: projectId,
    members: founder,
    applicants: [],
    description: description,
    signatures: [],
  });
  newProject.save();
  res.status(200).send("project created successfully by ", founder);
});

router.put("/voteOnProject/:id", (req, res) => {
  // attach so and so's name to the arr of ppl who voted for it
  let projectId = req.query.id;
  const voter = req.body.voter;
  // stopping for sleep
});

router.put("/updateProject/addApplicant", async (req, res) => {
  // so someone can add an applicant to a project
  let projectId = req.body.id;
  let applicantToAdd = req.body.newApplicant;
  let projectToUpdate = await db.Project.findOne({ _id: projectId });
  projectToUpdate.applicants.push(applicantToAdd);
  projectToUpdate.save();
  res.status(200).send("successful update");
});

router.put("/updateProject/convertApplicantToMember", async (req, res) => {
  // so someone who was previously an applicatn can be converted to a member status
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

router.delete("/deleteProject/:projectId", (req, res) => {
  // presumably need authorization from many people to do this
});

module.exports = router;
