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

const restaurantIdCounter = generateRange(1, 199);

const imgAddress =
  'https://www.intrepidtravel.com/adventures/wp-content/uploads/2017/07/shutterstock_528048049_800x450.jpg';

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = Array.from({ length: 4500 }, () => ({
      restaurantID:
        restaurantIdCounter[
          Math.floor(Math.random() * restaurantIdCounter.length)
        ],
      productName: faker.commerce.productName(),
      productDescription: faker.commerce.productDescription(),
      productComposition: faker.commerce.productDescription(),
      productPrice: Math.floor(Math.random() * 1200),
      productPhoto: imgAddress,
    }));

    await queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
