'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipes = sequelize.define('recipes', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    prepTime: DataTypes.STRING,
    type: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return recipes;
};