'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Days', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      days: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Days');
  },
};
