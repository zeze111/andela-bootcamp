'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    }
  });

  Review.associates = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
