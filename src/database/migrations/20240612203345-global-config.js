'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GlobalConfig', {
      key: { primaryKey: true, unique: true, type: Sequelize.STRING },
      value: { type: Sequelize.STRING },
    });
  },
};
