const { faker } = require('@faker-js/faker');

let userId = 1;

const createRestaurantArray = () => ({
  name: faker.company.name(),
  // address: faker.location.streetAddress(false),
  // city: faker.location.city(),
  // email: faker.internet.email(),
  // phoneNumber: faker.phone.number(),
  ownerId: userId++,
});
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurantList = Array.from({ length: 200 }, () =>
      createRestaurantArray(),
    );

    await queryInterface.bulkInsert('Restaurants', restaurantList, {});
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
