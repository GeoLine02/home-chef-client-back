'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */

const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

const userRange = generateRange(1, 199);

module.exports = {
  async up(queryInterface, Sequelize) {
    const address = Array.from({ length: 200 }, () => ({
      userID: userRange[Math.floor(Math.random() * userRange.length)],
      city: faker.location.city(),
      street: faker.location.streetAddress(),
      neighborhood: faker.location.state(),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    }));
    await queryInterface.bulkInsert('UserAddresses', address, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserAddresses', null, {});
  },
};
