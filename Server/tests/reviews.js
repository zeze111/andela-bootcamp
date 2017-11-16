import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { token } from './users';
import { recipeId2 } from './recipes';
import { review, update } from './mockdata';

const should = chai.should();

chai.use(chaiHttp);

describe('Review a recipe', () => {
  it('post the review for a recipes', (done) => {
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
});


describe('Errors for reviewing a recipe', () => {
  it('it should not find recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/7/reviews')
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
  it('it should only accept a number for recipe id', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/recipeid/reviews')
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
