const autocannon = require('autocannon');

// async/await
async function foo() {
  const result = await autocannon({
    url: 'http://localhost:4000/restaurant',
    connections: 1000,
    duration: 10, // default
  });
  console.log(result);
}


foo()