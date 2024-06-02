// 'use strict';

/** @type {import('sequelize-cli').Migration} */
const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};
const categoryIdCounter = 23;
const restaurantIdCounter = generateRange(1, 199);

module.exports = {
  async up(queryInterface, Sequelize) {
    const categoryJunctionList = Array.from({ length: 200 }, () => ({
      restaurantID:
        restaurantIdCounter[
          Math.floor(Math.random() * restaurantIdCounter.length)
        ],
      typeID: Math.floor(Math.random() * (categoryIdCounter - 1)) + 1,
    }));

    await queryInterface.bulkInsert(
      'RestaurantTypesJunctions',
      categoryJunctionList,
      {},
    );
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
