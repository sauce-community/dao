const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  // console.log(7);
  res.status(200).send();
});

router.get("/proposals", (req, res) => {
  let startedAt = req.body.startedAt; // for pagination.
  let firstRequest = startedAt === undefined;
  if (firstRequest) {
    db.Proposal.find({})
      // the idea is that the frontend stores the creation date to use for the next request
      .sort("-createdOn")
      .limit(20)
      .then((proposals) => {
        // console.log(14, proposals);
        res.status(200).json(proposals);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).send(err);
      });
  } else {
    // I hesitated to consider this the best way to do it, but StackOverflow says it's what you do.
    // https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
    db.Proposal.find({ createdOn: { $lte: startedAt } })
      // the idea is that the frontend stores the creation date to use for the next request.
      // If the frontend received dates between 01/01/2019 and 02/02/2019, the next query should
      // get dates between, say, 11/01/2018 and 12/01/2018
      .sort("-createdOn")
      .limit(20)
      .then((proposals) => {
        // console.log(14, proposals);
        res.status(200).json(proposals);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).send(err);
      });
  }
});

router.get("/proposal", (req, res) => {
  let number = req.query.number;
  let onlyNumbers = +number; // turns into NaN if any non-numeric values are present; otherwise converts to int
  if (onlyNumbers == NaN) {
    res.status(400).send();
    return;
  }
  // Question: Would it be bad practice to send the MongoDB objectId field to the frontend?
  // I could use that instead of an externalId and save a few lines.
  // See the .findOne query field.
  db.Proposal.findOne({ externalId: number }, function (err, successDoc) {
    if (err) {
      console.log(36, err);
    } else {
      console.log(39, successDoc);
      res.status(200).json(successDoc);
    }
  });
});

router.post("/proposal", (req, res) => {
  let proposalName = req.body.proposalName;
  let description = req.body.description;
  let authorAddress = req.body.authorAddress;
  if (
    proposalName === undefined ||
    description === undefined ||
    authorAddress === undefined
  ) {
    console.log(req.body, 54);
    res.status(400).send();
    return;
  }
  let voteProgress = 1;
  let createdOn = Date.now();
  // console.log(48);

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
        res.status(400).send(err);
      } else {
        // console.log(66, created);
        res.status(200).json(created);
      }
    }
  );
});

router.delete("/proposal", (req, res) => {
  let proposalName = req.body.proposalName;

  db.Proposal.findOneAndDelete(
    { proposalName: proposalName },
    function (err, deletedDoc) {
      if (err) {
        console.log(err);
        res.status(400).send();
      } else {
        res.status(200).json(deletedDoc);
      }
    }
  );
});

module.exports = router;
