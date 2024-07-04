'use strict';

const weekDays = [
  {
    days: 'sunday',
  },
  {
    days: 'monday',
  },
  {
    days: 'tuesday',
  },
  {
    days: 'wednesday',
  },
  {
    days: 'thurstday',
  },
  {
    days: 'friday',
  },
  {
    days: 'saturday',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Days', weekDays, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Days', null, {});
  },
};
