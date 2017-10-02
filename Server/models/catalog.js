'use strict';
module.exports = (sequelize, DataTypes) => {
  var catalog = sequelize.define('catalog', {
    upvotes: DataTypes.NUMBER,
    downvotes: DataTypes.NUMBER,
    favorite: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return catalog;
};