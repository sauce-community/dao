const request = require("supertest");
const app = require("../app");

// const { MongoMemoryServer } = require("mongodb-memory-server");

const Proposal = require("../models/Proposal.model.js");

describe("Proposals Endpoints", () => {
  let mongoServer;
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

  beforeAll(async () => {
    // mongoServer = await MongoMemoryServer.create();
    // const URI = await mongoServer.getUri();

    // mongoose.connect(URI, {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    // });

    for (const p of proposals) {
      const proposal = new Proposal(p);
      await proposal.save();
    }
  });

  afterAll(async (done) => {
    // mongoose.disconnect(done);
    // await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }
  });

  it("Allows creation of a proposal", async () => {
    const res = await request(app).post("/proposal").send({
      proposalName: "foo",
      description: "bar",
      authorAddress: "7b8b9b",
    });
    expect(res.body).toHaveProperty(externalId);
    expect(res.body).toHaveProperty(proposalName, "foo");
    expect(res.body).toHaveProperty(description, "bar");
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
    expect(res.body).toHaveProperty(externalId, 12345);
  });

  //   it("", () => {
  // const users = db.collection("Proposals");

  // const mockUser = { _id: "some-user-id", name: "John" };
  // await users.insertOne(mockUser);

  // const insertedUser = await users.findOne({ _id: "some-user-id" });
  // expect(insertedUser).toEqual(mockUser);
  //   });

  //   it("", () => {});
});
