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

const productRange = generateRange(1, 199);
const orderRange = generateRange(1, 199);

module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = Array.from({ length: 200 }, () => ({
      productID: productRange[Math.floor(Math.random() * productRange.length)],
      orderID: orderRange[Math.floor(Math.random() * productRange.length)],
    }));
    await queryInterface.bulkInsert('OrderProducts', orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderProducts', null, {});
  },
};
