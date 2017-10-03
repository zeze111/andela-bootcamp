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
      otherkey: 'userId',
      onDelete: 'CASCADE',
    });
    AboutRecipe.belongsToMany(models.User, {
      through: 'UserFavorites',
      foreignKey: 'userId',
      as: 'users',
      otherKey: 'aboutrecipeId',
    });
    AboutRecipe.hasMany(models.Review, {
      foreignKey: 'aboutrecipeId',
      otherKey: 'recipeId',
    });
  };
  return AboutRecipe;
};
