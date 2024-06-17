'use strict';

/** @type {import('sequelize-cli').Migration} */

const { faker } = require('@faker-js/faker');

let restaurantID = 1; // 200 restaurants in mock db

module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurantContactsList = Array.from({ length: 200 }, () => ({
      email: faker.internet.email(),
      phone: faker.phone.number(),
      restaurantID: restaurantID++,
    }));

    await queryInterface.bulkInsert(
      'RestaurantContacts',
      restaurantContactsList,
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('RestaurantContacts', null, {});
     */
  },
};
