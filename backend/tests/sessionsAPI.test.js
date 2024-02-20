const supertest = require("supertest");
const app = require('../server');
const {Session} = require("../models/sessionModel");
const {Course} = require("../models/courseModel");
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Session API', () => {
  let sessionId, courseId;

  before(async () => {
    await Session.deleteMany({});
  });

  // Before each test, create a new session
  beforeEach(async () => {
    const courseData = {
      name: 'Sample course'
    };
    const course = await Course.create(courseData);
    courseId = course._id;
    const sessionData = {
      name: 'Sample Session',
      description: 'Sample description',
      duration: 10,
      courseId
    };
    const newSession = await Session.create(sessionData);
    sessionId = newSession._id;
  });

  // Test GET all sessions
  it('should get all sessions', async () => {
    const res = await supertest(app).get('/api/sessions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });

  // Test GET one session
  it('should get one session', async () => {
    const res = await supertest(app).get(`/api/sessions/${sessionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });

  // Test POST one session
  it('should create a new session', async () => {
    const sessionData = {
      name: 'Sample Session',
      description: 'Sample description',
      duration: 10,
      courseId
    };
    const res = await supertest(app)
      .post('/api/sessions')
      .send(sessionData);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    // Save the sessionId for future requests
    sessionId = res.body.session._id;
  });

  // Test DELETE one session
  it('should delete a session', async () => {
    const res = await supertest(app).delete(`/api/sessions/${sessionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });

  // Test UPDATE one session
  it('should update a session', async () => {
    const updatedSessionData = {
      name: 'Updated Session Name',
      description: 'Updated description',
      duration: 15
    };
    const res = await supertest(app)
      .patch(`/api/sessions/${sessionId}`)
      .send(updatedSessionData);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });
});
