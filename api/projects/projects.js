const express = require("express");
const router = express.Router();

const db = require("../db");

// #11 - View Projects Page
router.get("/projects", (req, res) => {
  // get projects from the db return them showing their data.
  let startedAt = req.body.startedAt; // for pagination.
  let firstRequest = startedAt === undefined;
  // console.log(startedAt, 11);
  if (firstRequest) {
    db.Project.find({})
      .sort("-createdOn")
      .limit(20)
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    db.Project.find({ createdOn: { $lte: startedAt } })
      .sort("-createdOn")
      .limit(20)
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get("/project/:id", (req, res) => {
  let externalId = req.params.id;
  console.log(externalId, 37);
  db.Project.findOne({ externalId: externalId })
    .then((project) => {
      let projectApplicants = project.applicants;
      res.status(200).json(projectApplicants);
    })
    .catch((err) => {
      console.log(err);
    });
});

// view list of applicants by querying project id
router.get("/project/applicants/:projectId", (req, res) => {
  // view list of all the project's applicants
  // TODO: review and test this route
  let externalProjectId = req.params.projectId;
  console.log(externalProjectId, 38);
  db.Project.findOne({ externalId: externalProjectId })
    // Note: the function that creates a unique project id is still a TODO,
    // so there are many projects with the same externalId
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
    });
});

// #12 Create Project
router.post("/project", async (req, res) => {
  // it takes a founder or founder(s) to make a project
  let founder = req.body.founder;
  let name = req.body.name;
  let description = req.body.description;
  console.log(req.body, 54);
  if (
    founder === undefined ||
    name === undefined ||
    description === undefined
  ) {
    console.log(req.body, 54);
    res.status(400).send();
    return;
  }
  console.log(founder, name, description, 29);
  let newProject = await db.Project.create({
    name: name,
    description: description,
    projectOwner: founder,
    members: [],
    applicants: [],
    signatures: [],
    createdAt: Date.now(),
  });
  newProject.members.push(founder);
  newProject.save();
  const success = "project created successfully by " + founder;
  res.status(200).send(success);
});

// #13 Edit Project
router.put("/project", (req, res) => {
  let externalId = req.body.externalId;
  let description = req.body.description;
  let remainingMembers = req.body.remainingMembers;
  let remainingApplicants = req.body.remainingApplicants;
  // todo: should probably rewrite as, "membersToRemove" "applicantsToRemove" etc
  console.log(req.body, 88);
  db.Project.findOneAndUpdate(
    { externalId: externalId },
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
  let externalId = req.body.externalId;
  let applicantToAdd = req.body.newApplicant;
  console.log(135, externalId);
  let projectToUpdate = await db.Project.findOne({ externalId: externalId });
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
    // fixme: this is untested & I smell a bug here
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
