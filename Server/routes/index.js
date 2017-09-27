//const http = require('http');
//const express = require('express');
//const logger = require('morgan');
//const bodyParser = require('body-parser');

import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Values from './queries';

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));

app.use(bodyParser.json({ type: 'application/json', }))

app.get('/something', (req, res) =>
  res.status(202).send({ message: 'Hi you got here', }));

app.get('/route/:some_value', Values.myValue);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
