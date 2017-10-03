const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
      username: 'osaze',
      password: 'osaze94',
      database: 'recipes-dev',
      host: '127.0.0.1',
      port: '5433',
      dialect: 'postgres'
    },
    test: {
      username: 'osaze',
      password: 'osaze94',
      database: 'recipes_test',
      host: '127.0.0.1',
      port: '5433',
      dialect: 'postgres'
    }
  };

//module.exports = config[process.env.NODE_ENV || 'development'];

