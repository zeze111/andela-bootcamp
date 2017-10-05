'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {});
  
  Favorite.associates = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  }

  return Favorite;
};
