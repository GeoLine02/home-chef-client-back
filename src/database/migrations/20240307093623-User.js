'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  //eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
  },
};
