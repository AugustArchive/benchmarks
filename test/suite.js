const { Suite } = require('../build');

const suite = new Suite();
suite.add('test uwu', () => {}); // eslint-disable-line
suite.add('get from map', () => {
  const map = new Map();
  map.set('a', 1);
  map.get('a');
});

suite.on('started', () => console.log('start'));
suite.on('end', (stats) => {
  console.log(stats.toJSON());
  console.log('architecture:\n', suite.getArchitecture());
});

suite.start();