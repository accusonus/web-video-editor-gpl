import worker from 'workerize-loader?inline!./app.worker.js';
import packageJson from './package.json';

let workers = [];

export default class FFMPEG {
  static async process(file, command, callback, onmessage) {

    const onProcess = (payload) => {
      if (callback) {
        callback(payload);
      }
    };

    // Let's find a worker that had done the job
    const ready_worker = workers.findIndex((x) => x && x.ready);

    if (ready_worker > -1) {
      workers[ready_worker]
        .process(ready_worker, file, command)
        .then(onProcess);

      // Remove worker, work is done
      // This will help spring clean and release memory asap
      workers[ready_worker] = undefined;
      return;
    }

    // A new worker must be inited
    const new_worker = await worker();
    const new_worker_pos = workers.push(new_worker);

    // Let's connect function to remove messages
    new_worker.onmessage = onmessage;

    workers[new_worker_pos - 1]
      .process(ready_worker, file, command)
      .then(onProcess);
  }
}

FFMPEG.version = packageJson.version;
