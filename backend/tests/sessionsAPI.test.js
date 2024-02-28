const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { Session } = require("../models/sessionModel");
const { Course } = require("../models/courseModel");
const { User } = require("../models/userModel");

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe("Sessions API", () => {
  let courseId;
  let sessionId;

  before(async () => {
    await Session.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});

    const teacher = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test.user@mail.com",
      password: "password",
    });
    const teacherId = teacher._id;

    const course = await Course.create({
      name: "Test Course",
      description: "This is a test course",
      students: [1, 2, 3],
      teacherId,
    });
    courseId = course._id.toString();
  });

  // Test POST /api/sessions/:courseId/
  it("should create a new session", async () => {
    const res = await supertest(app).post(`/api/sessions/${courseId}`).send({
      name: "New Session",
      description: "This is a new session",
      start: new Date(),
      end: new Date(),
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("session");
    expect(res.body.session).to.have.property("course", courseId);
    sessionId = res.body.session._id;
  });

  // Test GET /api/sessions/:courseId/:sessionId
  it("should get one session", async () => {
    const res = await supertest(app).get(
      `/api/sessions/${courseId}/${sessionId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("session");
    expect(res.body.session).to.have.property("_id", sessionId);
  });

  // Test GET /api/courses/:courseId/
  it("should get all sessions of a course", async () => {
    const res = await supertest(app).get(`/api/sessions/${courseId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("sessions");
    expect(res.body.sessions).to.be.an("array");
  });

  // Test PATCH /api/courses/:courseId/:sessionId
  it("should update a session", async () => {
    const res = await supertest(app)
      .patch(`/api/sessions/${courseId}/${sessionId}`)
      .send({
        name: "Updated Session",
        description: "This is an updated session",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("updatedSession");
    expect(res.body.updatedSession).to.have.property("_id", sessionId);
    expect(res.body.updatedSession).to.have.property("name", "Updated Session");
    expect(res.body.updatedSession).to.have.property(
      "description",
      "This is an updated session"
    );
  });

  // Test DELETE /api/courses/:courseId/:sessionId
  it("should delete a session", async () => {
    const res = await supertest(app).delete(
      `/api/sessions/${courseId}/${sessionId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("deletedSession");
    expect(res.body.deletedSession).to.have.property("_id", sessionId);
  });
});
