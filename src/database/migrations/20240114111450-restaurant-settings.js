'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantSettings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants', key: 'id' },
        onDelete: 'cascade',
      },
      workingFrom: { type: Sequelize.TIME, allowNull: false },
      workingTill: { type: Sequelize.TIME, allowNull: false },
      isRestaurantActive: { type: Sequelize.BOOLEAN, defaultValue: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RestaurantSettings');
  },
};
