import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import token from './usertests';

chai.use(chaiHttp);

const should = chai.should;

const app = require('../Server');


const invalidToken = jwt.sign({
  userId: 1,
  authString: 'b921f6ff61ef9e63e4e38dfcedcd79ebdc16am5hr4ls63op',
}, {
  expiresIn: '48h',
});

describe('CRUD operations on Recipes', () => {
  describe('POST /api/v1/recipes', () => {
    it('it should return code 201 Succesful', () => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send({
          name: 'Amala and Ewedu',
          description: 'Yummy amala for everyday consumption',
          prepTime: '40 mins',
          type: 'dessert',
          ingredients: 'amala powder, ewedu leaf, stew',
          instructions: 'turn amala in pot, mix ewedu and stew',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.status.should.equal('Success');
          done();
        });
    });
    it('it should return code 400 cannot create recipe twice', () => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          name: 'Amala and Ewedu',
          description: 'Yummy amala for everyday consumption',
          prepTime: '40 mins',
          type: 'dessert',
          ingredients: 'amala powder, ewedu leaf, stew',
          instructions: 'turn amala in pot, mix ewedu and stew',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Cannot Create A Recipe Twice');
          done();
        });
    });
    it('it should return code 400 invalid data input', () => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          name: 'Amala and Ewedu',
          description: '',
          prepTime: '40 mins',
          type: 'dessert',
          ingredients: '',
          instructions: 'turn amala in pot, mix ewedu and stew',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
  });

  describe('GET /api/v1/recipes', () => {
    it('it should return code 200 Succesful and list of all recipes', () => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should return code 200 Succesful and empty list recipes', () => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('Currently No Recipes');
          done();
        });
    });
    it('it should return code 200 Succesful and list of popular recipes', () => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should return code 200 Succesful and empty list recipes', () => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          res.body.message.should.equal('Currently No Recipes');
          done();
        });
    });
  });

  describe('PUT /api/v1/recipes/recipeId', () => {
    it('it should return code 200 Succesful', () => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send({
          type: 'main',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Success');
          done();
        });
    });
    it('it should return code 400 Recipe Not Found', () => {
      chai.request(app)
        .put('/api/v1/recipes/2')
        .send({
          type: 'main',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
    it('it should return code 400 invalid data input', () => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send({
          type: 'ma',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Invalid data input');
          done();
        });
    });
  });

  describe('DELETE /api/v1/recipes/1', () => {
    it('it should return code 200 Succesful', () => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal('Successful');
          done();
        });
    });
    it('it should return code 400 Recipe Not Found', () => {
      chai.request(app)
        .delete('/api/v1/recipes/2')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.status.should.equal('Unsuccessful');
          res.body.message.should.equal('Recipe Not Found');
          done();
        });
    });
  });
});

