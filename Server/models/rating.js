'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Rating.associates = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Rating.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'ratings',
      onDelete: 'CASCADE',
    });
  };

  return Rating;
}
