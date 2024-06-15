'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('Restaurants', 'city');
    await queryInterface.removeColumn('Restaurants', 'email');
    await queryInterface.removeColumn('Restaurants', 'phoneNumber');
    await queryInterface.removeColumn('Restaurants', 'address');
  },
};
