'use strict';
module.exports = (sequelize, DataTypes) => {
  const AboutRecipe = sequelize.define('AboutRecipe', {
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  AboutRecipe.associates = (models) => {
    AboutRecipe.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    AboutRecipe.hasMany(models.Reviews, {
      foreignKey: 'aboutrecipeId',
      otherKey: 'recipeId',
    });
  };
  return AboutRecipe;
};
