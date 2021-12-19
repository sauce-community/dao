const request = require("supertest");
const app = require("../app");

const Proposal = require("../models/Proposal.model.js");

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

describe("Proposals Endpoints", () => {
  let mongoServer;

  beforeEach(async () => {
    for (const p of proposals) {
      const proposal = new Proposal(p);
      await proposal.save();
    }
  });

  afterEach(async () => {
    await Proposal.deleteMany({});
  });

  it("works for the blank route", async () => {
    const res = await request(app).get("/api/gov/");
    expect(res.statusCode).toBe(200);
  });

  it("POST Allows creation of a proposal", async () => {
    const res = await request(app).post("/api/gov/proposal").send({
      proposalName: "foo",
      description: "bar",
      authorAddress: "7b8b9b",
    });
    // expect(res.body).toHaveProperty(externalId);
    expect(res.body).toHaveProperty("proposalName", "foo");
    expect(res.body).toHaveProperty("description", "bar");
  });

  it("GET should return a batch of proposals", async () => {
    //
    const oneYearPrior = new Date();
    oneYearPrior.setFullYear(oneYearPrior.getFullYear() - 1);
    console.log(oneYearPrior, 66);
    // set one year in the past so the query's $lte has something to be less than or equal to chronologically
    const res = await request(app)
      .get("/api/gov/proposals")
      .send({ startedAt: oneYearPrior });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy(); // containing n > 0 json proposals.

    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty("proposalName");
    expect(res.body[0]).toHaveProperty("description");
  });

  it("GET Retrieves a proposal by its external id number", async () => {
    const res = await request(app).get("/api/gov/proposal?number=12345"); // fixme: need dateNow to be 12 months in the past
    expect(res.statusCode).toEqual(200);
    // console.log(res.body, res.body.externalId, res.body.description);
    expect(res.body).toHaveProperty("externalId", 12345);
  });

  it("400s when given incomplete or malformed inputs", async () => {
    const createNewProposal = await request(app)
      .post("/api/gov/proposal")
      .send({}); // is a malformed request, missing all 3 fields
    // expect(res.body).toHaveProperty(externalId);
    expect(createNewProposal.statusCode).toBe(400);
    // TODO: show a few more ways to generate malformed inputs

    const getProposal = await request(app).get(
      "/api/gov/proposal?number=abcde6"
    ); // numerical values only
  });
});
