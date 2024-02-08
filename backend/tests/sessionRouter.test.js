const supertest = require("supertest");
const app = require('../server');
const {Session} = require("../models/sessionModel");
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Session API', () => {
  let sessionId;

  before(async () => {
    await Session.deleteMany({});
  });

  // Before each test, create a new session
  beforeEach(async () => {
    const sessionData = {
      name: 'Sample Session',
      description: 'Sample description',
      start: new Date(),
      end: new Date()
    };
    const newSession = await Session.create(sessionData);
    sessionId = newSession._id;
  });

  // Test GET all sessions
  it('should get all sessions', async () => {
    const res = await supertest(app).get('/api/sessions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    // Add more assertions as per your response structure
  });

  // Test GET one session
  it('should get one session', async () => {
    const res = await supertest(app).get(`/api/sessions/${sessionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    // Add more assertions as per your response structure
  });

  // Test POST one session
  it('should create a new session', async () => {
    const sessionData = {
      name: 'Sample Session',
      description: 'Sample description',
      start: new Date(),
      end: new Date()
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
    // Add more assertions as per your response structure
  });

  // Test UPDATE one session
  it('should update a session', async () => {
    const updatedSessionData = {
      name: 'Updated Session Name',
      description: 'Updated description',
      start: new Date(),
      end: new Date()
    };
    const res = await supertest(app)
      .patch(`/api/sessions/${sessionId}`)
      .send(updatedSessionData);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    // Add more assertions as per your response structure
  });
});
