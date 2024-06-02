'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProducts', {
      orderID: {
        type: Sequelize.INTEGER,
        references: { model: 'Orders', key: 'id' },
        onDelete: 'cascade',
      },
      productID: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' },
        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProducts');
  },
};
