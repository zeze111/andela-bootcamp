'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    Users.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });
    Users.belongsToMany(models.AboutRecipe, {
      through: 'UserFavorites',
      foreignKey: 'userId',
      as: 'users',
      otherKey: 'aboutrecipeId',
    });
    Users.hasMany(models.Review, {
      foreignKey: 'userId',
    });
  };
  return User;
};
