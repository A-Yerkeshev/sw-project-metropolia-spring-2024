const supertest = require("supertest");
const app = require('../server');
const {User} = require("../models/userModel");
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Endpoints', () => {
  before(async () => {
    await User.deleteMany({});
  });

  let token;

  // Test user signup
  it('should signup a new user', async () => {
    const res = await supertest(app)
      .post('/api/user/signup')
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
      .post('/api/user/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('token');
    token = res.body.token; // Save the token for future requests
  });
});
