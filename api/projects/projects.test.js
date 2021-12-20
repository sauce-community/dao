const request = require("supertest");
const app = require("../app");

const Project = require("../models/Project.model.js");

const projects = [
  {
    externalId: 808,
    name: "foo",
    description: "bar",
    projectOwner: "baz",
    members: [],
    applicants: [],
    signatures: [],
    createdOn: Date.now(),
  },
];

// externalId, name, description, projectOwner, members, applicants, signatures, createdOn
describe("Projects endpoints", () => {
  beforeEach(async () => {
    for (const p of projects) {
      const project = new Project(p);
      project.members.push("Marle");
      project.members.push("Lucca");
      project.members.push("Crono");
      await project.save();
    }
  });

  afterEach(async () => {
    Project.deleteMany({});
  });

  it("GETs between one and twenty projects", async () => {
    const res = await request(app).get("/api/projects").send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.length).toBeLessThanOrEqual(20);
    expect(res.body[0]).toHaveProperty("projectOwner");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("description");

    // TODO: this test ought to test that the returned proposals really were created before the picked startedAt date.
    const endOfPage = res.body[res.body.length - 1].createdOn;
    const laterRes = await request(app)
      .get("/api/projects")
      .send({ startedAt: endOfPage });
    // console.log(laterRes.body, 66, laterRes.body.length);
    expect(laterRes.statusCode).toBe(200);
    expect(laterRes.body.length).toBeGreaterThanOrEqual(1);
    expect(laterRes.body.length).toBeLessThanOrEqual(20);
  });

  it("GETs the applicants of a specified project", async () => {
    let testProjectId = 123;
    let applicantsRoute = "/api/project/applicants/" + testProjectId.toString();
    console.log(applicantsRoute, 58);
    let res = await request(app).get(applicantsRoute).send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("applicants");
    expect(res.body).toHaveProperty("externalId", testProjectId);
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("projectOwner");
  });

  it("POSTs a new project", async () => {
    const foundedProject = {
      founder: "willy",
      name: "wonka factory co",
      description: "makes candy",
    };
    let res = await request(app).post("/api/project").send(foundedProject);
    // console.log(res, 72);
    expect(res.statusCode).toBe(200);
    let successString =
      "project created successfully by " + foundedProject.founder;
    expect(res.text).toBe(successString);
  });

  it("updates a project doc correctly", async () => {
    // todo
    let route = "/api/project";
    let update = {
      externalId: 123,
      description: "a new description",
      remainingMembers: ["Marle", "Lucca"],
      remainingApplicants: [],
    };
    let res = await request(app).put(route).send(update);
    expect(res.statusCode).toBe(200);
    // this should be the case regardless of how many members there were before the update
    expect(res.body.members.sort()).toEqual(["Marle", "Lucca"].sort());
  });

  //   it("adds an applicant to the list", async () => {});

  it("400s when there is malformed input", async () => {
    // lots of ways to write a faulty object, we'll test an empty one.
    let res = await request(app).post("/api/project").send({});
    expect(res.statusCode).toBe(400);
  });
});
