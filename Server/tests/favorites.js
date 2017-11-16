import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token, token2, userId, userId2 } from './users';
import { recipeId2 } from './recipes';

const should = chai.should();

chai.use(chaiHttp);

describe('Favorite a recipe', () => {
  it('recipe should be added to favorites', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/favorite`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Get a user\'s favorites', () => {
  it('it should return a list of all recipes favorited by the user', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId2}/favorites`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Errors for geting a user\'s favorites', () => {
  it('it should return an empty list', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId}/favorites`)
      .set('x-token', token)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unprocessable');
        res.body.message.should.equal('You Currently Have No Favorite Recipes');
        done();
      });
  });
  it('User should not be able to access another user\'s favorites', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId2}/favorites`)
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
