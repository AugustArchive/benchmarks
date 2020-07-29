/**
 * Copyright (c) 2020 August
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { BenchmarkResult, Stats } from './internal';
import { EventEmitter } from 'events';

/** Dud type of an empty function */
type EmptyFunction = (next: () => void) => void;

enum Status {
  Unknown = -1,
  Running = 0,
  Ended   = 1
}

export class Suite extends EventEmitter {
  /** The benchmarks that were added */
  private benchmarks: Map<string, EmptyFunction>;

  /** The status of the suite */
  private status: Status;

  /**
   * Creates a new Suite
   */
  constructor() {
    super();

    this.benchmarks = new Map();
    this.status = Status.Unknown;
  }

  /**
   * Adds a benchmark to this suite
   * @param benchmark The benchmark name
   * @param func The function to call
   */
  add(benchmark: string, func: EmptyFunction) {
    this.benchmarks.set(benchmark, func);
    return this;
  }

  /**
   * Starts the benchmark
   */
  async start() {
    if (!this.benchmarks.size) throw new Error('Benchmarks are non-existant');
    if (this.status === Status.Ended) throw new Error('This suite has done it\'s benchmarks.');

    this.emit('started');
    this.status = Status.Running;

    const benchmarks = [...this.benchmarks.entries()];
    const results = new Map<string, BenchmarkResult>();

    while (benchmarks.length > 0) {
      const [name, benchmark] = benchmarks.shift()!;
      const time = process.hrtime();
      benchmark(() => {
        const awaitedTime = process.hrtime(time);
        const t = parseFloat(String((awaitedTime[1] / 1000000 + awaitedTime[0] * 1000).toFixed(6)));

        results.set(name, new BenchmarkResult({ name, time: t }));
      });
    }

    this.status = Status.Ended;
    this.emit('end', new Stats(results));
  }
}