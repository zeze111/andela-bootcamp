import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import { token } from './users';
import { recipeId2 } from './recipes';
import { review, update } from './mockdata';

const should = chai.should();

chai.use(chaiHttp);

describe('Reviewing a recipe successfuly', () => {
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
});


describe('Error handling for reviewing a recipe', () => {
  it('it should return code 404 not found', (done) => {
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
  it('it should return code 406, Recipe ID Must Be A Number', (done) => {
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
