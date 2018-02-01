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
  describe('Create User', () => {
    it('it should sign up user successfuly', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(createUser1)
        .end((err, res) => {
          should.not.exist(err);
          token = res.body.token;
          userId = res.body.user.id;
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
          userId2 = res.body.user.id;
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

  describe('Update user', () => {
    it('it should update user\'s details successfuly', (done) => {
      chai.request(app)
        .put('/api/v1/user/')
        .set('x-token', token)
        .send({
          surname: 'Ajanla'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          res.body.message.should.equal('Your account has been updated');
          done();
        });
    });
  });

  describe('Get user details', () => {
    it('it should return all details', (done) => {
      chai.request(app)
        .get(`/api/v1/user/${userId2}`)
        .set('x-token', token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
  });

  describe('Errors for Updating Users', () => {
    it('it should prompt an invalid data input message', (done) => {
      chai.request(app)
        .put('/api/v1/users/')
        .set('x-token', token)
        .send({
          surname: 'a'
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(422);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
    it('it should prompt a must input data message', (done) => {
      chai.request(app)
        .put('/api/v1/users/')
        .set('x-token', token)
        .send({})
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(422);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Must input data');
          done();
        });
    });
  });

  describe('Errors for Getting User\'s details', () => {
    it('it should not find user in the database', (done) => {
      chai.request(app)
        .get('/api/v1/users/276')
        .set('x-token', token)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('User Not Found');
          done();
        });
    });
    it('it should prompt wrong param input', (done) => {
      chai.request(app)
        .put('/api/v1/users/')
        .set('x-token', token)
        .send({})
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(422);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Must input data');
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
          res.status.should.equal(422);
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
          res.status.should.equal(401);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid Credentials, you are unauthorized');
          done();
        });
    });
    it('it should prompt a wrong password message', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(errorUser)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Sign in failed, Wrong email/password');
          done();
        });
    });
  });
});
