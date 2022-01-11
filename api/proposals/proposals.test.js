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
  beforeEach(async () => {
    for (const p of proposals) {
      const proposal = new Proposal(p);
      await proposal.save();
    }
  });

  afterEach(async () => {
    Proposal.deleteMany({});
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
    const res = await request(app).get("/api/gov/proposals").send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty("proposalName");
    expect(res.body[0]).toHaveProperty("description");

    // TODO: this test ought to test that the returned proposals really were created before the picked startedAt date.
    const laterRes = await request(app)
      .get("/api/gov/proposals")
      .send({ startedAt: res.body[res.body.length - 1].createdOn });
    // console.log(laterRes.body, 66, laterRes.body.length);
    expect(laterRes.statusCode).toEqual(200);
    expect(laterRes.body.length).toBeGreaterThanOrEqual(1);
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
  });

  it("deletes a document by its proposalName", async () => {
    const deletedProposalName = "foo";
    let res = await request(app)
      .delete("/api/gov/proposal")
      .send({ proposalName: deletedProposalName });
    expect(res.statusCode).toBe(200);
    expect(res.body.proposalName).toEqual(deletedProposalName);
  });
});
