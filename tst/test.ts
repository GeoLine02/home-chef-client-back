const translations = [
  { en: 'Asian', ru: 'Азиатская' },
  { en: 'Burgers', ru: 'Бургеры' },
  { en: 'Sushi', ru: 'Суши' },
  { en: 'Pizza', ru: 'Пицца' },
  { en: 'Wok', ru: 'Вок' },
  { en: 'Pasta', ru: 'Паста' },
  { en: 'Breakfast', ru: 'Завтрак' },
  { en: 'Dinner', ru: 'Ужин' },
  { en: 'Georgian', ru: 'Грузинская' },
  { en: 'Italian', ru: 'Итальянская' },
  { en: 'Russian', ru: 'Русская' },
  { en: 'Uzbek', ru: 'Узбекская' },
  { en: 'Japan', ru: 'Японская' },
  { en: 'Chinese', ru: 'Китайская' },
  { en: 'Coffee', ru: 'Кофе' },
  { en: 'Desserts', ru: 'Десерты' },
  { en: 'Shaurma', ru: 'Шаурма' },
  { en: "Children's", ru: 'Детская' },
  { en: 'Europe', ru: 'Европейская' },
  { en: 'Vegan', ru: 'Веган' },
  { en: 'Seafood', ru: 'Морепродукты' },
  { en: 'Steak', ru: 'Стейк' },
  { en: 'Healthy food', ru: 'Здоровая еда' },
];

const promises = translations.map((translate) =>
  fetch('http://localhost:4000/restaurant-categories/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(translate),
  }),
);
console.log(promises);
Promise.all(promises)
  .then((responses) => {
    console.log('All requests succeeded:', responses);
  })
  .catch((error) => {
    console.error('At least one request failed:', error);
  });
