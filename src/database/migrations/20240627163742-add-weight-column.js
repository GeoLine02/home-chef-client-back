'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Products',
      'weight',
      Sequelize.NUMERIC(10, 2),
    );
  },
};
