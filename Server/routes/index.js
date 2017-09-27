import express from 'express';
import http from 'http';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));

app.use(bodyParser.json({ type: 'application/json', }))

app.get('*', (req, res) =>
  res.status(404).send({ message: 'Default 404 for everything', }));

app.get('/', (req, res) =>
  res.status(202).send({ message: 'Some info here', }));

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);

export default app;
