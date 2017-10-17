import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const should = chai.should;

const app = require('../Server/index.js');

let token;


describe('User Sign Up and Sign In', () => {
  before((done) => {
    chai.request(app).delete('/api/users').end(done);
  });
  describe('POST /api/v1/users/signup', () => {
    it('it should return code 201, user name and token', () => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstName: 'user1',
          surname: 'user',
          email: 'user1@gmail.com',
          password: 'testpassword',
          password_confirmation: 'testpassword',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          token = res.body.token;
          done();
        });
    });
  });
  describe('POST /api/v1/users/signin', () => {
    it('it should return code 200', () => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'user1@gmail.com',
          password: 'testpassword',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('You are now signed in');
          done();
        });
    });
  });
  describe('Error Handling for User Sign Up and Sign In', () => {
    describe('POST /api/v1/users/signup', () => {
      it('it should return code 400, invalid password error', () => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send({
            firstName: 'user1',
            surname: 'user',
            email: 'user1@gmail.com',
            password: 'test',
            password_confirmation: 'test',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.status.should.equal('Unsuccessful');
            res.body.message.should.equal('Invalid data input');
            done();
          });
        it('it should return code 400, user already exists error', () => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({
              firstName: 'user1',
              surname: 'user',
              email: 'user1@gmail.com',
              password: 'testpassword',
              password_confirmation: 'testpassword',
            })
            .end((err, res) => {
              res.status.should.equal(400);
              res.body.status.should.equal('Unsuccessful');
              res.body.message.should.equal('Email already exist');
              done();
            });
        });
        describe('POST /api/v1/users/signin', () => {
          it('it should return code 400, user not found error', () => {
            chai.request(app)
              .post('/api/v1/users/signin')
              .send({
                email: 'user2@gmail.com',
                password: 'testpassword',
              })
              .end((err, res) => {
                res.status.should.equal(400);
                res.body.status.should.equal('Unsuccessful');
                res.body.message.should.equal('User not found');
                done();
              });
          });
          it('it should return code 400, invalid password error', () => {
            chai.request(app)
              .post('/api/v1/users/signin')
              .send({
                email: 'user1@gmail.com',
                password: 'testpass',
              })
              .end((err, res) => {
                res.status.should.equal(400);
                res.body.status.should.equal('Unsuccessful');
                res.body.message.should.equal('Sign in failed, Wrong password');
                done();
              });
          });
        });
      });
    });
  });
});

export default token;
