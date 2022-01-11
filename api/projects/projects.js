const express = require("express");
const router = express.Router();

const db = require("../db");

// #11 - View Projects Page
router.get("/projects", (req, res) => {
  // get projects from the db return them showing their data.
  let startedAt = req.body.startedAt; // for pagination.
  db.Project.find({ createdOn: { $lte: startedAt } })
    .sortBy("-createdOn")
    .limit(20)
    .then((projects) => {
      res.status(200).json(projects);
    });
});

router.get("/projects/applicants/:id", (req, res) => {
  // view list of all the project's applicants
  // TODO: review and test this route
  let projectId = req.query.id;
  db.Project.findOne({ _id: projectId }).then((project) => {
    let projectApplicants = project.applicants;
    res.status(200).json(projectApplicants);
  });
});

// #12 Create Project
router.post("/projects", async (req, res) => {
  // it takes a founder or founder(s) to make a project
  let founder = req.body.founder;
  let name = req.body.name;
  let description = req.body.description;
  console.log(founder, name, description, 29);
  let newProject = await db.Project.create({
    name: name,
    description: description,
    projectOwner: founder,
    members: founder,
    applicants: [],
    signatures: [],
    createdAt: Date.now(),
  });
  newProject.save();
  const success = "project created successfully by " + founder;
  res.status(200).send(success);
});

// #13 Edit Project
router.put("/project", (req, res) => {
  let id = req.body._id;
  let description = req.body.description;
  let remainingMembers = req.body.remainingMembers;
  let remainingApplicants = req.body.remainingApplicants;
  // todo: should probably rewrite as, "membersToRemove" "applicantsToRemove" etc

  db.Project.findOneAndUpdate(
    { _id: id },
    {
      description: description,
      members: remainingMembers,
      applicants: remainingApplicants,
    },
    {
      new: true,
    }
  )
    .then((newDoc) => {
      res.status(200).json(newDoc);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/project/:id", (req, res) => {
  // attach so and so's name to the arr of ppl who voted for it
  let projectId = req.query.id;
  const voter = req.body.voter;
  // TODO: finish
});

router.put("/project/add", async (req, res) => {
  // so someone can add an applicant to a project
  let projectId = req.body.id;
  let applicantToAdd = req.body.newApplicant;
  let projectToUpdate = await db.Project.findOne({ externalId: projectId });
  projectToUpdate.applicants.push(applicantToAdd);
  projectToUpdate.save();
  res.status(200).send("successful update");
  // TODO: test either via postman or actual tests
});

router.put("/update/convert", async (req, res) => {
  // so someone who was previously an application can be converted to a member status
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
  // hypothetical route
  let authorizedUser = req.body.authorizedUser;
  let signedAuth = req.body.signedAuth;
  db.Project.findOneAndDelete(
    {
      projectOwner: authorizedUser,
      authLine: signedAuth,
    },
    function (err, deleted) {
      if (err) {
        res
          .status(400)
          .send("failed to delete -- are you authorized to do this?");
      }
      if (deleted) {
        tx.send("mark_project_as_depreciated").then((success) => {
          res.status(200).send();
        });
      }
    }
  );
});

router.delete("/deleteById", (req, res) => {
  // just for testing purposes
  const id = req.body._id;
  db.Project.findOneAndDelete({ _id: id }, function (err, deleted) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send("deleted!");
    }
  });
});

module.exports = router;
