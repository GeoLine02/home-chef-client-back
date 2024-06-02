'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      deliveryAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      status: { type: Sequelize.STRING, defaultValue: 'Created' },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      userAddressID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserAddresses',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      userPaymentMethodID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserPaymentMethods',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
