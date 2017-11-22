import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import { createUser1, createUser2, createUser3, fakeUser, errorUser, user1 } from './mockdata';


const should = chai.should();

export let token;
export let userId;
export let token2;
export let userId2;

chai.use(chaiHttp);

describe('Users', () => {
  db
    .User
    .destroy({
      cascade: true,
      truncate: true,
    });
  describe('Create User', () => {
    it('it should sign up user successfuly', (done) => {
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
    it('it should sign up user2 successfuly', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser2)
        .end((err, res) => {
          should.not.exist(err);
          token2 = res.body.token;
          userId2 = res.body.userId;
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          done();
        });
    });
  });


  describe('User Sign In', () => {
    it('it should sign user in successfuly', (done) => {
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


  describe('Errors for User Sign up', () => {
    it('it should prompt an invalid data input message', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser3)
        .end((err, res) => {
          res.status.should.equal(406);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
    it('it should prompt an email already exists message', (done) => {
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


  describe('Errors for Users Sign in', () => {
    it('it should not find user in the database', (done) => {
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
    it('it should promp a wrong password message', (done) => {
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
