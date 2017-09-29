import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const should = chai.should;

const app = require('../routes/index.js');


describe('HTTP API Testing', () =>{
  describe('GET /api/v1/recipes', () => {
    it('it should return code 200 and recipe list', () =>{
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) =>{
          res.status.should.equal(200);
          res.body.should.be.a('array');
          res.body.status.should.equal('Success');
          done();
        });
    });
  });
  describe('GET /api/v2/recipes?sort=upvotes&order=des', () =>{
    it('it should return code 200 and popular recipe list', () =>{
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) =>{
          res.status.should.equal(200);
          res.body.should.be.a('array');
          res.body.status.should.equal('Success');
          done();
        });
    });
  });

  describe('POST /api/v1/recipes', () =>{
    it('it should return code 201 Succesful', () =>{
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          id: 5,
          title: 'mango juice',
          details: 'cut and squeeze juice into a cup'
        })
        .end((err, res) =>{
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('Submitted Recipe');
          done();
        });
    });
    it('it should return code 400 Missing data input', () =>{
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          id: 10,
          title: 'mango juice',
        })
        .end((err, res) =>{
          should.not.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          done();
        });
    });
  });
  describe('POST /api/v1/recipes/2/reviews', () =>{
    it('it should return code 201 Succesful', () =>{
      chai.request(app)
        .post('/api/v1/recipes/2/reviews')
        .send({
          review: 'Love love love this recipe, use it all the time'
        })
        .end((err, res) =>{
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('PUT /api/v1/recipes/5', () =>{
    it('it should return code 201 Succesful', () =>{
      chai.request(app)
        .put('/api/v1/recipes/5')
        .send({
          details: 'Cut and squeez juice, using juicer, serve chilled'
        })
        .end((err, res) =>{
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('Updated Recipe');
          done();
        });
    });
    it('it should return code 404 Recipe Not Found', () =>{
      chai.request(app)
        .put('/api/v1/recipes/:recipeId')
        .send({
          details: 'Cut and squeez juice, using juicer, serve chilled'
        })
        .end((err, res) =>{
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
  });

  describe('DELETE /api/v1/recipes/1', () =>{
    it('it should return code 200 Succesful', () =>{
      chai.request(app)
        .delete('/api/v1/recipes/:recipeId')
        .end((err, res) =>{
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('Recipe Deleted');
          done();
        });
    });
    it('it should return code 404 Recipe Not Found', () =>{
      chai.request(app)
        .delete('/api/v1/recipes/:recipeId')
        .end((err, res) =>{
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
  });
});
