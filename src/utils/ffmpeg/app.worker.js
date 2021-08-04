export let initialized = false;
export let ready = false;

function readFileAsBufferArray(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();

    fileReader.onload = function () {
      resolve(this.result);
    };

    fileReader.onerror = function () {
      reject(this.error);
    };

    fileReader.readAsArrayBuffer(file);
  });
}

export async function process(i, file, command) {
  return new Promise(async (resolve) => { // eslint-disable-line no-async-promise-executor
    ready = false;

    if (!initialized) {
      postMessage({code: 1, msg: 'FFMPEG is loading', bubbles: true});

      // Unfortunately we cannot use (easilly) locally stored file
      // .. as importScripts needs full URL and hardcoding such a value will create
      // .. problems with local development, PR links, and live result
      // await importScripts('http://localhost:3000/ffmpeg.js'); // eslint-disable-line no-undef

      await importScripts('https://dev.nullion.com/ffmpeg.js'); // eslint-disable-line no-undef
      postMessage({code: 2, msg: 'FFMPEG loaded'});
      initialized = true;
    }

    const arrayBuffer = await readFileAsBufferArray(file);
    postMessage({code: 3, msg: `Command to execute: ${command.join(' ')}`});
    const Module = {
      print: (text) => { postMessage({code: 4, msg: `FFMPEG LOG: ${text}`}); },
      printErr: (text) => { postMessage({code: 4, msg: `FFMPEG LOG: ${text}`}); },
      files: [
        {
          data: new Uint8Array(arrayBuffer),
          name: file.name,
        },
      ],
      arguments: command,
      TOTAL_MEMORY: 2100000000,
    };
    postMessage({code: 5, msg: 'FFMPEG is working'});
    const result = await ffmpeg_run(Module); // eslint-disable-line no-undef
    postMessage({code: 6, msg: 'FFMPEG is done working'});

    ready = true;

    // No file was created
    if (!result || result.length <= 0) {
      resolve({
        worker: i,
        result: null,
      });
      return;
    }

    const fileResult = result[0];
    var arrayBufferView = new Uint8Array(fileResult.data);
    var blob = new Blob([arrayBufferView], {
      type: file.type,
    });

    resolve({
      worker: i,
      result: new File([blob], fileResult.name, { type: file.type }),
    });
  });
}
