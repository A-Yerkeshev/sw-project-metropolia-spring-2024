const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const {Course} = require("../models/courseModel");
const {User} = require("../models/userModel");

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Courses API', () => {
  let teacherId;
  let courseId;
  let token;

  before(async () => {
    await User.deleteMany({});
    await Course.deleteMany({});

    const res = await supertest(app)
      .post('/api/users/signup')
      .send({
        firstName: 'Test',
      lastName: 'User',
      email: 'test.user@mail.com',
      password: 'password'
      });
    teacherId = res.body.id;
    token = res.body.token;
  });

  // Test POST /api/courses
  it('should create a new course', async () => {
    const res = await supertest(app)
      .post('/api/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Course',
        description: 'This is a test course',
        teacherId
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('course');
    expect(res.body.course).to.have.property('_id');
    expect(res.body.course).to.have.property('teacherId', teacherId.toString());
    courseId = res.body.course._id;
  });

  // Test GET /api/courses/:courseId
  it('should get one course', async () => {
    const res = await supertest(app).get(`/api/courses/${courseId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('course');
    expect(res.body.course).to.have.property('_id', courseId);
  });

  // Test GET /api/courses
  it('should get all courses', async () => {
    const res = await supertest(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('courses');
    expect(res.body.courses).to.be.an('array');
  });

  // Test PATCH /api/courses/:courseId
  it('should update a course', async () => {
    const res = await supertest(app)
      .patch(`/api/courses/${courseId}`)
      .send({
        name: 'Updated Course',
        description: 'This is an updated test course'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('updatedCourse');
    expect(res.body.updatedCourse).to.have.property('_id', courseId);
    expect(res.body.updatedCourse).to.have.property('name', 'Updated Course');
  });

  // Test DELETE /api/courses/:courseId
  it('should delete a course', async () => {
    const res = await supertest(app).delete(`/api/courses/${courseId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('deletedCourse');
    expect(res.body.deletedCourse).to.have.property('_id', courseId);
  });
});
