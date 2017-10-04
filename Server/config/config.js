const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'recipes-dev',
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres',
    logging: false,
    jwtSecret: 'recipes-AP1',
    jwtSession: {session: false}
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'recipes_test',
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres'
  }
};

//module.exports = config[process.env.NODE_ENV || 'development'];

