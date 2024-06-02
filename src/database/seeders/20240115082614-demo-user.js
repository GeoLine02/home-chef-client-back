// 'use strict';

const { faker } = require('@faker-js/faker');
const roles = ['admin', 'user', 'restaurant_owner'];

const createUserArray = () => ({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  isAccountActive: true,
  role: roles[Math.floor(Math.random() * roles.length)],
});

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const userArray = Array.from({ length: 200 }, () => createUserArray());

    await queryInterface.bulkInsert('Users', userArray, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
