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
const userPaymentRange = generateRange(1, 100);
const userIdRange = generateRange(1, 100);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const order = Array.from({ length: 200 }, () => ({
      cardMask: faker.finance.creditCardIssuer(),
      currency: 'GEL',
      type: 'CARD',
      status: 'COMMITTED',
      commitDate: Date.now(),
      amount: priceRange[Math.floor(Math.random() * priceRange.length)],
      amountRefunded: priceRange[Math.floor(Math.random() * priceRange.length)],
      refundable: true,
      paymentDate: Date.now(),
      // finalAmount: (function () {
      //   this.amount - this.amountRefunded;
      // })(),
      finalAmount: priceRange[Math.floor(Math.random() * priceRange.length)],
      userPaymentMethodID:
        userPaymentRange[Math.floor(Math.random() * userPaymentRange.length)],
      userID: userIdRange[Math.floor(Math.random() * userIdRange.length)],
    }));
    await queryInterface.bulkInsert('PaymentTransactions', order, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentTransactions', null, {});
  },
};
