# @augu/benchmarks
> :whale2: **| Lightweight benchmarking library made for personal use.**

## Usage
```ts
import { Suite } from '@augu/benchmarks';

const benchmarks = new Suite();
benchmarks.add('@augu/immutable - Collection', () => {
  // do stuff here
});

benchmarks.add('Collection', () => {
  // do stuff here
});

benchmarks.on('started', () => {
  // benchmark has started, suite is in a running state
});

benchmarks.on('end', (stats) => {
  // benchmark has ended, let's do something with the stats! (state = ended)
});

benchmarks.start(); // Promise<void>
```

## License
**@augu/benchmarks** is released under the MIT License. Read [here](/LICENSE) for more information.