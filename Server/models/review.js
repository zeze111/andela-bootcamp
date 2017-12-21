'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });

  Review.associate = (models) => {
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
