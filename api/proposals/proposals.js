const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/proposals", (req, res) => {
  let startedAt = req.body.startedAt; // for pagination.
  // I hesitated to consider this the best way to do it, but StackOverflow says it's what you do.
  // https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
  db.Proposal.find({ createdOn: { $lte: startedAt } })
    .sort("-createdOn")
    .limit(20)
    .then((proposals) => {
      console.log(14, proposals);
      res.status(200).json(proposals);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get("/proposal", (req, res) => {
  let number = req.params.number;
  // Question: Would it be bad practice to send the MongoDB objectId field to the frontend?
  // I could use that instead of an externalId and save a few lines.
  // See the .findOne query field.
  console.log(number, 22);
  db.Proposal.findOne({ externalId: number }, function (err, successDoc) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(successDoc);
    }
  });
});

router.post("/proposal", (req, res) => {
  let proposalName = req.body.proposalName;
  let description = req.body.description;
  let authorAddress = req.body.authorAddress;
  let voteProgress = 1;
  let createdOn = Date.now();

  let externalId = Math.floor(Math.random() * 10000);

  db.Proposal.create(
    {
      externalId: externalId,
      proposalName: proposalName,
      description: description,
      authorAddress: authorAddress,
      voteProgress: voteProgress,
      createdOn: createdOn,
    },
    function (err, created) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(created);
      }
    }
  );
});

router.delete("/proposal", (req, res) => {
  let proposalName = req.body.proposalName;

  db.Proposal.findOneAndDelete(
    { proposalName: proposalName },
    function (err, deleted) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("successfully deleted " + proposalName);
      }
    }
  );
});

module.exports = router;
