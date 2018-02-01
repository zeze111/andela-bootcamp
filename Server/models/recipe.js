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
    preparationTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Appetizer', 'Main', 'Dessert', 'Drinks'],
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Rating, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Recipe;
};
