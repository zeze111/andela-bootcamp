import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token, token2, userId, userId2 } from './users';
import { recipeId2, recipeId } from './recipes';

const should = chai.should();

chai.use(chaiHttp);

describe('Favorite a recipe', () => {
  it('should add recipe to favorites', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/favorite`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('Recipe has been added to your Favorites')
        done();
      });
  });
  it('should add recipe 2 to favorites', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId}/favorite`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('Recipe has been added to your Favorites')
        done();
      });
  });
});

describe('Get popular recipes', () => {
it('list of popular recipes should be returned', (done) => {
  chai.request(app)
    .get('/api/v1/recipes/favorites/?sort=favorites&order=desc')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.status.should.equal('Successful');
      done();
    });
});
});

describe('Get a user\'s favorites', () => {
  it('it should return a list of all recipes favorited by the user', (done) => {
    chai.request(app)
      .get(`/api/v1/user/favorites`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Favorite recipe again', () => {
  it('should delete recipe 1 from favorites', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/favorite`)
      .set('x-token', token2)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('Recipe has been removed from your Favorites')
        done();
      });
  });
});


describe('Delete recipe from favorites', () => {
  it('should delete recipe 2 from favorites', (done) => {
    chai.request(app)
    .delete(`/api/v1/user/favorites/${recipeId}`)
    .set('x-token', token2)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.status.should.equal('Successful');
      res.body.message.should.equal('Recipe has been removed from your Favorites')
      done();
    });
  });
});

describe('Favorite recipe 2 again', () => {
  it('should add recipe 2 to favorites', (done) => {
    chai.request(app)
    .post(`/api/v1/recipes/${recipeId}/favorite`)
    .set('x-token', token2)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(201);
      res.body.status.should.equal('Successful');
      res.body.message.should.equal('Recipe has been added to your Favorites')
      done();
    });
  });
});

describe('Error for deleting a recipe from favorites', () => {
  it('it should not find recipe in favorites list', (done) => {
    chai.request(app)
      .delete('/api/v1/user/favorites/50')
      .set('x-token', token2)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found')
        done();
      });
  });
});

describe('Errors for geting a user\'s favorites', () => {
  it('it should return an empty list', (done) => {
    chai.request(app)
    .get(`/api/v1/user/favorites`)
    .set('x-token', token)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.status.should.equal('Successful');
      res.body.message.should.equal('You Currently Have No Favorite Recipes');
      done();
    });
  });
});
