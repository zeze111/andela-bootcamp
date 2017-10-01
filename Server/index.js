import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import consign from 'consign';

const app = express();

require('dotenv').config();
//routes 
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, }));

app.use(bodyParser.json({ type: 'application/json', }));

consign()
	.include('./Server/routes')
	.into(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port);

module.exports = app;
