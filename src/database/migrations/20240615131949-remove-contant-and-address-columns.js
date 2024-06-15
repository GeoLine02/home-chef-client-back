'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurants', 'city');
    await queryInterface.removeColumn('Restaurants', 'email');
    await queryInterface.removeColumn('Restaurants', 'phoneNumber');
    await queryInterface.removeColumn('Restaurants', 'address');
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
