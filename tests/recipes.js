import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../Server';
import { token } from './users';
import { recipe1, recipe2, errorRecipe, update } from './mockdata';

const should = chai.should();

chai.use(chaiHttp);

export let recipeId;
export let recipeId2;


describe('Error handling for empty recipes table', () => {
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
  it('it should return code 422 Unprocessable for an empty list of popular recipes', (done) => {
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


describe('Submit a Recipe succesfully', () => {
  it('it should return code 201, Recipe created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe1)
      .end((err, res) => {
        recipeId = res.body.recipeId;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
  it('it should return code 201, for another recipe created', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(recipe2)
      .end((err, res) => {
        recipeId2 = res.body.recipeId;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal('Success');
        done();
      });
  });
});


describe('Error handling for submitting a recipe', () => {
  it('it should return code 401, Unauthorised user', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipe1)
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
      .send(recipe1)
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
      .send(errorRecipe)
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(406);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Invalid data input');
        done();
      });
  });
});


describe('Retrieve list of all recipes', () => {
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
});


describe('Updating a recipe succesfully', () => {
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
});


describe('Error handling for updating a recipe', () => {
  it('it should return code 401, invalid token', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('x-token', 'jefrsghndxfngxkjdgrldxgk.jdhffhkjvnuhdgn.jdudfshsk')
      .send(update)
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
      .send(update)
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


describe('Delete a recipe succesfully', () => {
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
});


describe('Error handling for deleting a recipe', () => {
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

describe('Retrieve one recipe successfully', () => {
  it('it should return code 200 and recipe details', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipeId2}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal('Successful');
        done();
      });
  });
});


describe('Error handling for retrieving one recipe', () => {
  it('it should return code 404 and recipe not found', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/493')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal('Unsuccessful');
        res.body.message.should.equal('Recipe Not Found');
        done();
      });
  });
});
