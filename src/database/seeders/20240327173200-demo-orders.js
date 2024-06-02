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

const priceRange = generateRange(1, 100);
const userIdRange = generateRange(1, 199);
const deliveryPriceRange = (Math.random() * 1000).toFixed(2);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const order = Array.from({ length: 200 }, () => ({
      deliveryAmount: deliveryPriceRange,
      totalAmount:
        priceRange[Math.floor(Math.random() * priceRange.length)] +
        deliveryPriceRange,
      amount: priceRange[Math.floor(Math.random() * priceRange.length)],
      userPaymentMethodID:
        userIdRange[Math.floor(Math.random() * userIdRange.length)],
      userID: userIdRange[Math.floor(Math.random() * userIdRange.length)],
      userAddressID:
        userIdRange[Math.floor(Math.random() * userIdRange.length)],
    }));
    await queryInterface.bulkInsert('Orders', order);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
