'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurantID: {
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants', key: 'id' },
        onDelete: 'cascade',
      },
      productName: { type: Sequelize.STRING },
      productDescription: { type: Sequelize.STRING },
      productComposition: { type: Sequelize.STRING },
      productPhoto: { type: Sequelize.STRING },
      productPrice: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
