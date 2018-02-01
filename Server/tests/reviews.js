import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token, token2 } from './users';
import { recipeId2 } from './recipes';
import { review, update } from './mockdata';

const should = chai.should();
let reviewId;

chai.use(chaiHttp);

describe('Empty data for get all reviews', () => {
  it('it should return an empty list', (done) => {
    chai.request(app)
      .get(`/api/v1/recipe/${recipeId2}/reviews`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('No Reviews Posted Yet');
        done();
      });
  });
});

describe('Review a recipe', () => {
  it('successfuly post a review', (done) => {
    chai.request(app)
      .post(`/api/v1/recipe/${recipeId2}/review`)
      .set('x-token', token)
      .send({
        title: 'Amazing',
        comment: 'love this recipe'
      })
      .end((err, res) => {
        reviewId = res.body.review.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Errors for reviewing a recipe', () => {
  it('it should not find recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipe/7/review')
      .set('x-token', token)
      .send(review)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
  it('it should reject wrong input data format', (done) => {
    chai.request(app)
      .post(`/api/v1/recipe/${recipeId2}/review`)
      .set('x-token', token)
      .send({
        comment: 'love',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
  it('it should only accept a number for recipe id', (done) => {
    chai.request(app)
      .post('/api/v1/recipe/recipeid/review')
      .set('x-token', token)
      .send(update)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe ID Must Be A Number');
        done();
      });
  });
});

describe('Get all reviews', () => {
  it('list of reviews should be returned', (done) => {
    chai.request(app)
      .get(`/api/v1/recipe/${recipeId2}/reviews`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Errors for deleting a review', () => {
  it('it should not find review', (done) => {
    chai.request(app)
      .delete('/api/v1/recipe/reviews/500')
      .set('x-token', token)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Review Not Found');
        done();
      });
  });
  it('User should not be able to delete another user\'s review', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipe/reviews/${reviewId}`)
      .set('x-token', token2)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(403);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('You are Not Authorized to Remove This Review');
        done();
      });
  });
});

describe('Delete a review', () => {
  it('review should be deleted', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipe/reviews/${reviewId}`)
      .set('x-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        res.body.message.should.equal('Review has been removed');
        done();
      });
  });
});
