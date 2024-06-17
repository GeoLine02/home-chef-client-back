'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      country: { notNull: true, type: Sequelize.STRING },
      capital: { notNull: true, type: Sequelize.STRING },
      countryShortHand: { notNull: true, type: Sequelize.STRING },
      phonePrefix: { notNull: true, type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
