const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'recipes-dev',
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'recipes_test',
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.HEROKU_POSTGRESQL_COPPER_URL,
  },
};

