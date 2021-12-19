const request = require("supertest");
const app = require("../app");

const Proposal = require("../models/Proposal.model.js");

// const { MongoClient } = require("mongodb");

describe("Proposals Endpoints", () => {
  let connection;
  let db;

  //   beforeAll(async () => {
  //     connection = await MongoClient.connect(global.__MONGO_URI__, {
  //       useNewUrlParser: true,
  //       // TODO: put MongoClient.connect string into config.json
  //     });
  //     db = await connection.db(global.__MONGO_DB_NAME__);

  //     // TODO: put MongoClient.connect string into config.json
  //   });
  //   // TODO: create separate MongoDB database that is deleted and started fresh for every suite of tests.

  //   afterAll(async () => {
  //     await connection.close();
  //     await db.close();
  //   });

  beforeAll(async () => {
    // fill the proposals db with a few test proposals
    const proposals = [
      {
        externalId: 12345,
        proposalName: "bar",
        description: "baz",
        authorAddress: "0x1y2z",
        voteProgress: 0,
        createdOn: Date.now(),
      },
      {
        externalId: 11116,
        proposalName: "bar",
        description: "baz",
        authorAddress: "3a2b1c",
        voteProgress: 10,
        createdOn: Date.now(),
      },
    ];
    for (const p of proposals) {
      const proposal = new Proposal(p);
      await proposal.save();
    }
  });

  it("should return a batch of proposals", async () => {
    //
    const oneYearPrior = new Date();
    oneYearPrior.setFullYear(oneYearPrior.getFullYear() - 1);
    // set one year in the past so the query's $lte has something to be less than or equal to chronologically

    const res = await request(app)
      .get("/proposals")
      .send({ startedAt: oneYearPrior });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy(); // contain what? json proposals.
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty("proposalName");
    expect(res.body[0]).toHaveProperty("description");
  });

  it("Retrieves a proposal by its external id number", async () => {
    const res = await request(app).get("/proposal?number=12345"); // fixme: need dateNow to be 12 months in the past
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContain(); // contain what? json proposals.
  });

  //   it("", () => {
  // const users = db.collection("Proposals");

  // const mockUser = { _id: "some-user-id", name: "John" };
  // await users.insertOne(mockUser);

  // const insertedUser = await users.findOne({ _id: "some-user-id" });
  // expect(insertedUser).toEqual(mockUser);
  //   });

  //   it("", () => {});

  //   it("", () => {});
});

// describe("insert", () => {
//   it("should insert a doc into collection", async () => {
//     const users = db.collection("users");

//     const mockUser = { _id: "some-user-id", name: "John" };
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({ _id: "some-user-id" });
//     expect(insertedUser).toEqual(mockUser);
//   });
// });
