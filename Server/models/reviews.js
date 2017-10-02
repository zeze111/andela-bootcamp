'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Reviews.associates = (models) => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Reviews.belongsTo(models.AboutRecipe, {
      foreignKey: 'aboutrecipeId',
      otherKey: 'recipeId',
    });
  };
  return Reviews;
};
