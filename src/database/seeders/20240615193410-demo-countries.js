// eslint-disable-next-line @typescript-eslint/no-var-requires
const { countries } = require('countries-list');

const countriesList = Object.keys(countries).map((key) => ({
  country: countries[key].name,
  capital: countries[key].capital,
  phonePrefix: String(countries[key].phone[0]),
  countryShortHand: key,
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Locales', countriesList, {});
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
