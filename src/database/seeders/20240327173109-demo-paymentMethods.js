'use strict';

const { faker } = require('@faker-js/faker');
const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomStrings(count, length) {
  const randomStrings = [];
  for (let i = 0; i < count; i++) {
    randomStrings.push(generateRandomString(length));
  }
  return randomStrings;
}

const randomStrings = generateRandomStrings(200, 15);
const userRange = generateRange(1, 199);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cards = Array.from({ length: 200 }, () => ({
      userID: userRange[Math.floor(Math.random() * userRange.length)],
      source: 'Card',
      cardMask: faker.finance.maskedNumber(),
      cardBrand: faker.finance.creditCardIssuer(),
      cardToken:
        randomStrings[Math.floor(Math.random() * randomStrings.length)],
    }));
    await queryInterface.bulkInsert('UserPaymentMethods', cards, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserPaymentMethods', null, {});
  },
};
