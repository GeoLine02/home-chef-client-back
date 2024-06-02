'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentTransactions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      cardMask: {
        type: Sequelize.STRING,
      },
      amount: { type: Sequelize.DECIMAL(10, 2) },
      finalAmount: { type: Sequelize.DECIMAL(10, 2) },
      commitDate: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      currency: { type: Sequelize.STRING },
      amountRefunded: { type: Sequelize.DECIMAL(10, 2) },
      status: { type: Sequelize.STRING },
      refundable: { type: Sequelize.BOOLEAN },
      paymentDate: { type: Sequelize.STRING },
      userID: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
      },
      userPaymentMethodID: {
        type: Sequelize.INTEGER,
        references: { model: 'UserPaymentMethods', key: 'id' },
        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentTransactions');
  },
};
