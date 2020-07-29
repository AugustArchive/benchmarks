declare module '@augu/benchmarks' {
  import { EventEmitter } from 'events';

  namespace benchmarks {
    /** Dud type of an empty function */
    type EmptyFunction = (done: () => void) => void;

    enum Status {
      Unknown = -1,
      Running = 0,
      Ended   = 1
    }

    /** Returns the version of the library */
    export const version: string;

    export class Suite extends EventEmitter {
      /** The benchmarks that were added */
      private benchmarks: Map<string, EmptyFunction>;
    
      /** The status of the suite */
      private status: Status;
    
      /**
       * Creates a new Suite
       */
      constructor();
    
      /**
       * Adds a benchmark to this suite
       * @param benchmark The benchmark name
       * @param func The function to call
       */
      public add(benchmark: string, func: EmptyFunction): this;
    
      /**
       * Starts the benchmark
       */
      public start(): Promise<void>;

      /**
       * Emitted when the suite has been started
       */
      public on(event: 'started', listener: () => void): this;

      /**
       * Emitted when the benchmarks have been calculated
       */
      public on(event: 'end', listener: (stats: benchmarks.Statistics) => void): this;

      /**
       * Emitted when the suite has been started
       */
      public once(event: 'started', listener: () => void): this;

      /**
       * Emitted when the benchmarks have been calculated
       */
      public once(event: 'end', listener: (stats: benchmarks.Statistics) => void): this;
    }

    /**
     * Inline class to show the statistics of the benchmark
     */
    class Statistics {
      /** The results as a Map */
      private results: Map<string, BenchmarkResult>;

      /**
       * Construct a new Statistics class
       * @param results The results
       */
      constructor(results: Map<string, BenchmarkResult>);

      /**
       * Converts the values into a Table
       */
      toTable(): any[][];

      /**
       * Converts the stats to a JSON object
       */
      toJSON(): { [x: string]: { time: number, winner: boolean } };

      /**
       * Gets the fastest benchmark
       */
      getWinner(): benchmarks.BenchmarkResult;
    }

    /** Constructor object for **BenchmarkResult** */
    interface Result {
      /** The name of the benchmark that was ran */
      name: string;

      /** Time in milliseconds how long it took */
      time: number;
    }

    /**
     * Represents a "class" of the Benchmarking result
     */
    class BenchmarkResult {
      /** The name of the benchmark that was ran */
      public name: string;

      /** Time in milliseconds how long it took */
      public time: number;

      /**
       * Constructs a new **BenchmarkResult** class
       * @param result The result itself
       */
      constructor(result: Result);
    }
  }

  export = benchmarks;
}