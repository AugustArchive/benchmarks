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

import BenchmarkResult from './BenchmarkResult';
import sortMap from '../util/sortMap';

/**
 * Inline class to show the statistics of the benchmark
 */
export default class Statistics {
  /** The results as a Map */
  private results: Map<string, BenchmarkResult>;

  /**
   * Construct a new Statistics class
   * @param results The results
   */
  constructor(results: Map<string, BenchmarkResult>) {
    this.results = results;
  }

  /**
   * Converts the values into a Table
   */
  toTable() {
    const table: any[][] = [
      ['Benchmark', 'Winner', 'Time']
    ];

    for (const [name, result] of this.results) {
      const winner = sortMap(this.results, (a, b) => a.time - b.time)[0];

      table.push([
        name, winner.name, result.time
      ]);
    }

    return table;
  }

  /**
   * Converts the stats to a JSON object
   */
  toJSON() {
    const obj: {
      [x: string]: { time: number, winner: boolean }
    } = {};

    for (const [name, result] of this.results) {
      const isWinner = (sortMap(this.results, (a, b) => a.time - b.time)[0]).name === name;
      obj[name] = {
        winner: isWinner,
        time: result.time
      };
    }

    return obj;
  }
  
  /**
   * Gets the fastest benchmark
   */
  getWinner() {
    return (sortMap(this.results, (a, b) => b.time - a.time))[0];
  }
}