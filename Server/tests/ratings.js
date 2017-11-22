import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token2 } from './users';
import { recipeId2 } from './recipes';

const should = chai.should();

chai.use(chaiHttp);

describe('Downvote a recipe', () => {
  it('recipe should be downvoted', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/downvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Upvote a recipe', () => {
  it('downvote should be changed to upvote', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/upvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('it should delete upvote', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/upvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Upvote the recipe again', () => {
  it('recipe should be upvoted', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${recipeId2}/upvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

/* describe('Retrieving the most popular recipes', () => {
  it('it should return code 200, and a list of popular recipes', (done) => {
    chai.request(app)
      .get('api/v1/recipes?sort=upvotes&order=des')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
}); */
