'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Reviews.associates = (models) => {
    Reviews.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Reviews.belongsTo(models.AboutRecipe, {
      foreignKey: 'aboutrecipeId',
      otherKey: 'recipeId',
    });
  };
  return Review;
};
