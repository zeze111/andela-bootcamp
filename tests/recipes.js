import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import { token, userId } from './users';

const should = chai.should();

chai.use(chaiHttp);

export let recipeId;
export let recipeId2;


describe('GET /api/v1/recipes', () => {
  it('it should return code 422 Unprocessable and an empty list of recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unprocessable');
        res.body.message.should.equal('Currently No Recipes');
        done();
      });
  });
});


describe('POST /api/v1/recipes', () => {
  it('it should return code 201, Recipe created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send({
        name: 'Amala and Ewedu',
        description: 'Yummy amala for everyday consumption',
        prepTime: '40 mins',
        type: 'dessert',
        ingredients: 'amala powder, ewedu leaf, stew',
        instructions: 'turn amala in pot, mix ewedu and stew',
      })
      .end((err, res) => {
        recipeId = res.body.recipeId;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
  it('it should return code 401, Unauthorised user', (done) => {
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
        res.status.should.equal(401);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Unauthorised User');
        done();
      });
  });
  it('it should return code 409, cannot create recipe twice', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
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
        res.status.should.equal(409);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Cannot Create A Recipe With the Same Name');
        done();
      });
  });
  it('it should return code 406, invalid data input', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
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
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
  it('it should return code 201, for another recipe created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send({
        name: 'name',
        description: 'description',
        prepTime: 'time time',
        type: 'dessert',
        ingredients: 'ingredients, ingredients, ingredients',
        instructions: 'instructions',
      })
      .end((err, res) => {
        recipeId2 = res.body.recipeId;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
});


describe('GET /api/v1/recipes', () => {
  it('it should return code 200 Successful and list of all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('it should return code 422 Unprocessable for an empty list recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(422);
        res.body.status.should.equal('Unprocessable');
        res.body.message.should.equal('There are no Popular Recipes');
        done();
      });
  });
});


describe('PUT /api/v1/recipes/recipeId', () => {
  it('it should return code 200 Succesful, recipe updated', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .send({
        type: 'main',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('it should return code 401, invalid token', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', 'jefrsghndxfngxkjdgrldxgk.jdhffhkjvnuhdgn.jdudfshsk')
      .send({
        type: 'main',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(401);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid token');
        done();
      });
  });
  it('it should return code 404 Recipe Not Found', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/500')
      .set('x-token', token)
      .send({
        type: 'main',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
  it('it should return code 406, invalid data input', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .send({
        type: 'ma',
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


describe('DELETE /api/v1/recipes/recipeId', () => {
  it('it should return code 200 Succesful, recipe deleted', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .set('x-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
  it('it should return code 404, Recipe Not Found', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/500')
      .set('x-token', token)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
});

