'use strict';

/** @type {import('sequelize-cli').Migration} */

const types = [
  { typeName: 'Asian', typeNameRU: 'Азиатская' },
  { typeName: 'Burgers', typeNameRU: 'Бургеры' },
  { typeName: 'Sushi', typeNameRU: 'Суши' },
  { typeName: 'Pizza', typeNameRU: 'Пицца' },
  { typeName: 'Wok', typeNameRU: 'Вок' },
  { typeName: 'Pasta', typeNameRU: 'Паста' },
  { typeName: 'Breakfast', typeNameRU: 'Завтрак' },
  { typeName: 'Dinner', typeNameRU: 'Ужин' },
  { typeName: 'Georgian', typeNameRU: 'Грузинская' },
  { typeName: 'Italian', typeNameRU: 'Итальянская' },
  { typeName: 'Russian', typeNameRU: 'Русская' },
  { typeName: 'Uzbek', typeNameRU: 'Узбекская' },
  { typeName: 'Japan', typeNameRU: 'Японская' },
  { typeName: 'Chinese', typeNameRU: 'Китайская' },
  { typeName: 'Coffee', typeNameRU: 'Кофе' },
  { typeName: 'Desserts', typeNameRU: 'Десерты' },
  { typeName: 'Shaurma', typeNameRU: 'Шаурма' },
  { typeName: 'Children', typeNameRU: 'Детская' },
  { typeName: 'Europe', typeNameRU: 'Европейская' },
  { typeName: 'Vegan', typeNameRU: 'Веган' },
  { typeName: 'Seafood', typeNameRU: 'Морепродукты' },
  { typeName: 'Steak', typeNameRU: 'Стейк' },
  { typeName: 'Healthy food', typeNameRU: 'Здоровая еда' },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RestaurantTypes', types, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
