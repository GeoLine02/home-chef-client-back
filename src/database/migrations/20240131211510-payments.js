'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPaymentMethods', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      source: { type: Sequelize.STRING },
      cardMask: { type: Sequelize.STRING },
      cardBrand: { type: Sequelize.STRING },
      cardToken: { type: Sequelize.STRING },
      userID: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPaymentMethods');
  },
};
