const supertest = require("supertest");
const app = require('../server');
const {User} = require("../models/userModel");
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  before(async () => {
    await User.deleteMany({});
  });

  let token;

  // Test user signup
  it('should signup a new user', async () => {
    const res = await supertest(app)
      .post('/api/users/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('token');
  });

  // Test user login
  it('should login an existing user', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('token');
    token = res.body.token;

    // Check that password recovery token has been generated
    const user = await User.findOne({}, {}, { sort: { 'created_at' : -1 } });
    expect(!!user.recoveryToken).to.not.equal(false);
  });

  it('should not be able to login as non-existing user', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .send({
        email: 'non-registered-user@mail.com',
        password: 'password123'
      });
    expect(res).to.have.status(404);
  });
});
