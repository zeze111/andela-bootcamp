const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Values = require('./queries');

//import http from 'http';
//import express from 'express';
//import logger from 'morgan';
//import bodyParser from 'body-parser';
//import Values from './queries';

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));

app.use(bodyParser.json({ type: 'application/json', }));

app.get('/', (req, res) =>
	res.status(202).send({ message: 'Please enter: ', }));


app.get('/api/v1/recipes', Values.getAllRecipes);
app.get('/api/v1/recipes?sort=upvotes&order=des', Values.getPopularRecipes);
app.put('/api/v1/recipes/:recipeId', Values.updateRecipe);
app.post('/api/v1/recipes', Values.submitRecipe);
app.post('/api/v1/recipes/:recipeId/reviews', Values.reviewRecipe);
app.delete('/api/v1/recipes/:recipeId', Values.deleteRecipe);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
