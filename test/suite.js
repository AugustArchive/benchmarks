const { Suite } = require('../build');

const suite = new Suite();
suite.add('test uwu', (next) => {
  next();
});

suite.add('get from map', (next) => {
  const map = new Map();
  map.set('a', 1);
  map.get('a');

  next();
});

suite.add('looping a million times (normal for loop)', (next) => {
  for (let i = 0; i < 1000000; i++) {} // eslint-disable-line
  next();
});

suite.add('looping a million times (for-of loop)', (next) => {
  const array = Array(1000000);
  for (const a of array) {} // eslint-disable-line

  next();
});

suite.on('started', () => console.log('start'));
suite.on('end', (stats) => {
  console.log(stats.toJSON());
  process.exit(1);
});

suite.start();