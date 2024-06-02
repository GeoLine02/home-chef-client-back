'use strict';

/** @type {import('sequelize-cli').Migration} */
let restaurantId = 1;
module.exports = {
  async up(queryInterface, Sequelize) {
    const settingsArray = Array.from({ length: 200 }, () => ({
      restaurantID: restaurantId++,
      workingFrom: '09:00:00',
      workingTill: '20:00:00',
      isRestaurantActive: true,
    }));

    await queryInterface.bulkInsert('RestaurantSettings', settingsArray, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
