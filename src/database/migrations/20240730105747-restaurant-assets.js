'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantAssets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants', key: 'id' },
        onDelete: 'cascade',
      },
      introImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RestaurantAssets');
  },
};
