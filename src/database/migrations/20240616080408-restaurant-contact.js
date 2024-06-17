'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantContacts', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
      },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
