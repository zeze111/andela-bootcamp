'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.AboutRecipe, {
      foreignKey: 'userId',
      as: 'users',
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId',
    });
  };
  return Users;
};
