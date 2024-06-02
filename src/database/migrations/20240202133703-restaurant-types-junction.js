'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantTypesJunctions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      typeID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RestaurantTypes',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RestaurantTypesJunctions');
  },
};
