import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import users from './routes/users';
import recipes from './routes/recipes';

require('dotenv').config();

const app = express();
const jsonKey = process.env.SECRET_KEY;

const compiler = webpack(webpackConfig);

const publicPath = express.static(path.join(__dirname, '../build/'));

//
app.set('JsonSecret', jsonKey);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(express.static(path.join(__dirname, '../client/assets')));

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use((req, res, next) => {
  const { send } = res;
  let sent = false;
  res.send = (data) => {
    if (sent) return;
    send.bind(res)(data);
    sent = true;
  };
  next();
});

app.use('/', publicPath);

app.use('/api/v1/users', users);
app.use('/api/v1/user', users);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1/favorites', recipes);


app.use('*', express.static('build'));

// app.get('*', (req, res) => {
//   // res.status(200).sendFile(path.join(__dirname, '../build/index.html'));

// });


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log(`App started on Port: ${port}`);
});

export default app;
