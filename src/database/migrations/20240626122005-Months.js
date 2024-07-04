'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Months', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      month: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Months');
  },
};
