'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prepTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    }
  });

  Recipe.associates = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasOne(models.AboutRecipe, {
      foreignKey: 'recipeId',
      otherKey: 'userId',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return Recipe;
};
