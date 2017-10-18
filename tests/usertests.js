import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../Server';
import db from '../Server/models';

const should = chai.should();

chai.use(chaiHttp);

let token;


describe('User Sign Up and Sign In', () => {
  describe('Users', () => {
    db
      .User
      .destroy({
        cascade: true,
        truncate: true,
      });
    describe('POST /api/v1/users/signup', () => {
      it('it should return code 201, user name and token', (done) => {
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
            token = res.body.token;
            res.status.should.equal(201);
            res.body.status.should.equal('Success');
            done();
          });
      });
    });
    describe('POST /api/v1/users/signin', () => {
      it('it should return code 200', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({
            email: 'user1@gmail.com',
            password: 'testpassword',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.status.should.equal('Success');
            res.body.message.should.equal('You are now signed in');
            done();
          });
      });
    });

    describe('Error Handling for User Sign Up and Sign In', () => {
      describe('POST /api/v1/users/signup', () => {
        it('it should return code 400, invalid password error', (done) => {
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
        });
        it('it should return code 400, user already exists error', (done) => {
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
          it('it should return code 400, user not found error', (done) => {
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
          it('it should return code 400, invalid password error', (done) => {
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


describe('CRUD operations on Recipes', () => {
  describe('Recipes', () => {
    db
      .Recipe
      .destroy({
        cascade: true,
        truncate: true,
      });
    describe('POST /api/v1/recipes', () => {
      it('it should return code 201 Succesful', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-token', token)
          .send({
            name: 'Amala and Ewedu',
            description: 'Yummy amala for everyday consumption',
            prepTime: '40 mins',
            type: 'dessert',
            ingredients: 'amala powder, ewedu leaf, stew',
            instructions: 'turn amala in pot, mix ewedu and stew',
          })
          .end((err, res) => {
            console.log(err);
            should.not.exist(err);
            res.status.should.equal(201);
            res.body.status.should.equal('Success');
            done();
          });
      });
      it('it should return code 400 cannot create recipe twice', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-token', token)
          .send({
            name: 'Amala and Ewedu',
            description: 'Yummy amala for everyday consumption',
            prepTime: '40 mins',
            type: 'dessert',
            ingredients: 'amala powder, ewedu leaf, stew',
            instructions: 'turn amala in pot, mix ewedu and stew',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.body.status.should.equal('Unsuccessful');
            res.body.message.should.equal('Cannot Create A Recipe Twice');
            done();
          });
      });
    });
  });
});
