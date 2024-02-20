const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const {Feedback} = require("../models/feedbackModel");
const {Course} = require("../models/courseModel");
const {Session} = require("../models/sessionModel");

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Feedback API', () => {
  let courseId;
  let sessionId;
  let feedbackId;

  before(async () => {
    await Feedback.deleteMany({});

    const course = await Course.create({
      name: 'Test Course',
      description: 'This is a test course',
      students: [1, 2, 3]
    })
    courseId = course._id;

    const session = await Session.create({
      name: 'Test Session',
      description: 'This is a test session',
      start: new Date(),
      end: new Date(),
      course: courseId
    })
    sessionId = session._id;
  });

  // Test POST /api/feedbacks
  it('should create a new feedback', async () => {
    const res = await supertest(app)
      .post(`/api/feedbacks`)
      .send({
        rating: 4,
        text: 'Good session',
        studentId: 123,
        sessionId
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('feedback');
    feedbackId = res.body.feedback._id;
  });

  // Test GET /api/feedbacks/:feedbackId
  it('should get one feedback', async () => {
    const res = await supertest(app).get(
      `/api/feedbacks/${feedbackId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('feedback');
    expect(res.body.feedback).to.have.property('_id', feedbackId);
  });

  // Test GET /api/feedbacks
  it('should get all feedbacks of a session', async () => {
    const res = await supertest(app).get(
      `/api/feedbacks`
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('feedbacks');
    expect(res.body.feedbacks).to.be.an('array');
  });

  // Test DELETE /api/feedbacks/:feedbackId
  it('should delete a feedback', async () => {
    const res = await supertest(app).delete(
      `/api/feedbacks/${feedbackId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('deletedFeedback');
    expect(res.body.deletedFeedback).to.have.property('_id', feedbackId);
  });
});
