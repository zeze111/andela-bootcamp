import Sequelize from 'sequelize';

let sequelize = null;

export default config => {
  if (!sequelize) {
    sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'postgres'
    });
  }
  return sequelize;
}

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
