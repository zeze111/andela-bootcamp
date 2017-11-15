import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import { token, userId } from './users';
import { recipeId, recipeId2 } from './recipes';

import './users';
import './recipes';

const should = chai.should();

chai.use(chaiHttp);

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
  it('it should return code 201 and recipe details', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/reviews`)
      .set('x-token', token)
      .send({
        comment: 'love this recipe',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
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
  it('it should return code 406 invalid data', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/reviews`)
      .set('x-token', token)
      .send({
        comment: 'love',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
});
  
describe('GET /api/v1/user/:userId/favorites', () => {
  it('it should return code 422 and empty list', (done) => {
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
  /* it('it should return code 200 and recipe details', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId}/favorites`)
      .set('x-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  }); */
  it('it should return code 403 unauthorized', (done) => {
    chai.request(app)
      .get('/api/v1/user/300/favorites')
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
