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

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Ratings, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Favorites, {
      foreignKey: 'userId',
    });
    User.belongsToMany(models.AboutRecipe, {
      through: 'UserFavorite',
      foreignKey: 'userId',
      as: 'users',
      otherKey: 'aboutrecipeId',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
    });
  };
  return User;
}
