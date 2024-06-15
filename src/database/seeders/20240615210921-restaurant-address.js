/** @type {import('sequelize-cli').Migration} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

let restaurantID = 1; //200 restaurants in mock db
let countryID = 1; //255

function generateMockData() {
  return {
    restaurantID: restaurantID++,
    countryID: countryID++,
    address: faker.address.streetAddress(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    city: faker.address.cityName(),
  };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const mockData = Array.from({ length: 200 }, () => generateMockData());
    await queryInterface.bulkInsert('RestaurantAddress', mockData, {});
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
