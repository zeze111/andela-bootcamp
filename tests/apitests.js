import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../Server';
import db from '../Server/models';

const should = chai.should();

chai.use(chaiHttp);

let token;
let recipeId;
let recipeId2;
let userId;

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
            userId = res.body.userId;
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
  describe('GET /api/v1/recipes', () => {
    it('it should return code 200 Succesful and empty list of recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          res.body.message.should.equal('Currently No Recipes');
          done();
        });
    });
  });
  describe('POST /api/v1/recipes', () => {
    it('it should return code 201 Recipe created', (done) => {
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
          recipeId = res.body.recipeId;
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          done();
        });
    });
    it('it should return code 401 Unauthorised user', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
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
          res.status.should.equal(401);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Unauthorised User');
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
    it('it should return code 400 invalid data input', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-token', token)
        .send({
          name: 'Amala and Ewedu',
          description: '',
          prepTime: '40 mins',
          type: 'dessert',
          ingredients: '',
          instructions: 'turn amala in pot, mix ewedu and stew',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
    describe('Same user submitting another recipe', () => {
      it('it should return code 201 recipe created', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-token', token)
          .send({
            name: 'name',
            description: 'description',
            prepTime: 'time time',
            type: 'dessert',
            ingredients: 'ingredients, ingredients, ingredients',
            instructions: 'instructions',
          })
          .end((err, res) => {
            recipeId2 = res.body.recipeId;
            should.not.exist(err);
            res.status.should.equal(201);
            res.body.status.should.equal('Success');
            done();
          });
      });
    });
  });


  describe('GET /api/v1/recipes', () => {
    it('it should return code 200 Succesful and list of all recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 200 Succesful and list of popular recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 200 Succesful and empty list recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          res.body.message.should.equal('There are no Popular Recipes');
          done();
        });
    });
  });

  describe('PUT /api/v1/recipes/recipeId', () => {
    it('it should return code 200 Succesful', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('x-token', token)
        .send({
          type: 'main',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 401 invalid token', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('x-token', 'jefrsghndxfngxkjdgrldxgk.jdhffhkjvnuhdgn.jdudfshsk')
        .send({
          type: 'main',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid token');
          done();
        });
    });
    it('it should return code 404 Recipe Not Found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2')
        .set('x-token', token)
        .send({
          type: 'main',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
    it('it should return code 400 invalid data input', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('x-token', token)
        .send({
          type: 'ma',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
  });

  describe('DELETE /api/v1/recipes/recipeId', () => {
    it('it should return code 200 Succesful', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .set('x-token', token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 404 Recipe Not Found', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/2')
        .set('x-token', token)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
  });
});


describe('Operations on Recipes', () => {
  describe('GET /api/v1/recipes/:recipeId', () => {
    it('it should return code 200 and recipe details', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${recipeId2}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 404 and recipe not found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/3')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('POST /api/v1/recipes/:recipeId/reviews', () => {
    it('it should return code 200 and recipe details', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId2}/reviews`)
        .set('x-token', token)
        .send({
          comment: 'love this recipe',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 404 not found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/7/reviews')
        .set('x-token', token)
        .send({
          comment: 'love this recipe',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
    it('it should return code 400 invalid data', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId2}/reviews`)
        .set('x-token', token)
        .send({
          comment: 'love',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
  });

  describe('GET /api/v1/user/:userId/favorites', () => {
    it('it should return code 200 and empty list', (done) => {
      chai.request(app)
        .get(`/api/v1/user/${userId}/favorites`)
        .set('x-token', token)
        .end((err, res) => {
          console.log(err);
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          res.body.message.should.equal('You Currently Have No Favorite Recipes');
          done();
        });
    });
    it('it should return code 200 and recipe details', (done) => {
      chai.request(app)
        .get(`/api/v1/user/${userId}/favorites`)
        .set('x-token', token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 401 unauthorized', (done) => {
      chai.request(app)
        .get('/api/v1/user/1/favorites')
        .set('x-token', token)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Cannot Access Another User\'s Favorites');
          done();
        });
    });
  });
});
