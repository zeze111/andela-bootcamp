'use strict';
module.exports = (sequelize, DataTypes) => {
  var reviews = sequelize.define('reviews', {
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return reviews;
};