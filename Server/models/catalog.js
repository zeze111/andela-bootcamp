'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalog', {
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    downvotes:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
      
  return catalog;
};
