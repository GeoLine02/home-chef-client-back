'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const monthsList = [
      { month: 'January' },
      { month: 'February' },
      { month: 'March' },
      { month: 'April' },
      { month: 'May' },
      { month: 'June' },
      { month: 'July' },
      { month: 'August' },
      { month: 'September' },
      { month: 'October' },
      { month: 'November' },
      { month: 'December' },
    ];
    await queryInterface.bulkInsert('Months', monthsList);
  },

  async down(queryInterface, Sequelize) {},
};
