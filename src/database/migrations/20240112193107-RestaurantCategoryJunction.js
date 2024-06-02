'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantTypes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      typeName: { type: Sequelize.STRING, unique: true },
      typeNameRU: { type: Sequelize.STRING, unique: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RestaurantTypes');
  },
};
