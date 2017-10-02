'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
  }
});

Users.associate = (models) => {
  Users.hasMany(models.recipes, {
    foreignKey: 'userId',
    
  })
}
  return Users;
};
