import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import db from '../Server/models';
import { createUser1, createUser2, fakeUser, errorUser, user1 } from './mockdata';


const should = chai.should();

export let token;
export let userId;

chai.use(chaiHttp);

describe('Users', () => {
  db
    .User
    .destroy({
      cascade: true,
      truncate: true,
    });
  describe('Succesful User Creation', () => {
    it('it should return code 201, Sign up successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser1)
        .end((err, res) => {
          should.not.exist(err);
          token = res.body.token;
          userId = res.body.userId;
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          done();
        });
    });
  });


  describe('Successful User Sign In', () => {
    it('it should return code 200, sign in successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(user1)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('You are now signed in');
          done();
        });
    });
  });


  describe('Error Handling when users sign up', () => {
    it('it should return code 406, invalid password error', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser2)
        .end((err, res) => {
          res.status.should.equal(406);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
    it('it should return code 409, user already exists error', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser1)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Email already exist');
          done();
        });
    });
  });


  describe('Error handling when users sign in', () => {
    it('it should return code 404, user not found error', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeUser)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('User not found');
          done();
        });
    });
    it('it should return code 409, invalid password error', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(errorUser)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Sign in failed, Wrong password');
          done();
        });
    });
  });
});
