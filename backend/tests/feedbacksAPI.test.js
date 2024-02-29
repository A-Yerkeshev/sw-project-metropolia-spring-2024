const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const {Feedback} = require("../models/feedbackModel");
const {Course} = require("../models/courseModel");
const {Session} = require("../models/sessionModel");
const {User} = require("../models/userModel");

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Feedback API', () => {
  let sessionId;
  let feedbackId;
  let courseId;

  before(async () => {
    await Feedback.deleteMany({});
    await Session.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});

    const teacher = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@mail.com',
      password: 'password'
    });
    const teacherId = teacher._id;

    const course = await Course.create({
      name: 'Test Course',
      description: 'This is a test course',
      students: [1, 2, 3],
      teacherId
    })
    courseId = course._id;

    const session = await Session.create({
      name: 'Test Session',
      description: 'This is a test session',
      start: Date.now(),
      end: Date.now() + 1000*60,
      course: courseId
    })
    sessionId = session._id.toString();
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
    expect(res.body.feedback).to.have.property('sessionId', sessionId);
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
    const res = await supertest(app).get(`/api/feedbacks`).query({ sessionId: sessionId });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('feedbacks');
    expect(res.body.feedbacks).to.be.an('array');
    res.body.feedbacks.forEach((feedback) => {
      expect(feedback.sessionId._id).to.equal(sessionId);
    });
  });

  it('should not be able to submit feedback more than once', async () => {
    const res = await supertest(app)
      .post(`/api/feedbacks`)
      .send({
        rating: 4,
        text: 'Good session',
        studentId: 123,
        sessionId
      });

    expect(res.status).to.equal(400);
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

  // it('should not be able to submit feedback after session has expired', async () => {
  //   const session = await Session.create({
  //     name: 'Test Session',
  //     description: 'This is a test session',
  //     start: Date.now(),
  //     end: Date.now() - 1,
  //     course: courseId
  //   });

  //   const res = await supertest(app)
  //     .post(`/api/feedbacks`)
  //     .send({
  //       rating: 4,
  //       text: 'Good session',
  //       studentId: 123,
  //       sessionId: session._id
  //     });

  //     expect(res.status).to.equal(400);
  // });
});
