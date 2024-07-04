'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantWorkingDaysJunctions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'Restaurants',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      workingDaysID: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'RestaurantWorkingDays',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      monthID: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'RestaurantWorkingMonths',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      year: {
        type: Sequelize.INTEGER,

        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RestaurantWorkingDaysJunctions');
  },
};
