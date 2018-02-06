'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING
      },
      preparationTime: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM,
        values: ['Appetizer', 'Main', 'Dessert', 'Drinks'],
      },
      ingredients: {
        type: Sequelize.STRING(1234)
      },
      instructions: {
        type: Sequelize.STRING(1234)
      },
      image: {
        type: Sequelize.STRING
      },
      views: {
        type: Sequelize.INTEGER
      },
      check: {
        type: Sequelize.BOOLEAN
      },
      favorites: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes', {
      force:true, cascade:true
    });
  }
};
