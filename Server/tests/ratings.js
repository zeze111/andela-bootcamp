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
      .post(`/api/v1/recipe/${recipeId2}/downvote`)
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
      .post(`/api/v1/recipe/${recipeId2}/upvote`)
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
      .post(`/api/v1/recipe/${recipeId2}/upvote`)
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
  it('should return upvoted', (done) => {
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

describe('Downvote the recipe again', () => {
  it('upvote should be changed to downvote', (done) => {
    chai.request(app)
      .post(`/api/v1/recipe/${recipeId2}/downvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('it should delete downvote', (done) => {
    chai.request(app)
      .post(`/api/v1/recipe/${recipeId2}/downvote`)
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

describe('Error for Upvoting a recipe', () => {
  it('should return a parameter must be number error', (done) => {
    chai.request(app)
      .post(`/api/v1/recipe/sa/upvote`)
      .set('x-token', token2)
      .send()
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        done();
      });
  });
});

describe('Get all upvotes for a recipe', () => {
  it('should return total number', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipeId2}/upvotes`)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});

describe('Get all downvotes for a recipe', () => {
  it('should return total number', (done) => {
    chai.request(app)
      .get(`/api/v1/recipe/${recipeId2}/downvotes`)
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});
// describe('Get the most upvoted recipes', () => {
//   it('it should return a list of recipes', (done) => {
//     chai.request(app)
//       .get('api/v1/recipes?sort=upvotes&order=des')
//       .end((err, res) => {
//         should.not.exist(err);
//         res.status.should.equal(200);
//         res.body.status.should.equal('Successful');
//         done();
//       });
//   });
// });
