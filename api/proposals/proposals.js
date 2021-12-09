const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/proposals", (req, res) => {
  let startedAt = req.body.startedAt; // for pagination.
  db.Proposals.find({ createdOn: { $lte: startedAt } })
    .sortBy("-createdOn")
    .limit(20)
    .then((proposals) => {
      res.status(200).json(proposals);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get("/proposal", (req, res) => {
  let number = req.params.number;
  console.log(number, 22);
  db.Proposals.findOne({ externalId: number }, function (err, successDoc) {
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

  db.Proposals.create(
    {
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

  db.Proposals.findOneAndDelete(
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
