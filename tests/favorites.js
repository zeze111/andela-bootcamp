import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import { token, userId } from './users';

const should = chai.should();

chai.use(chaiHttp);

describe('Error handling for retrieving a user\'s favorites', () => {
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
