declare module 'worker-loader!./worker' {
  export default class MaskWorker extends Worker {
    constructor()
    new(stringUrl: string | URL, options?: WorkerOptions | undefined): Worker

    postMessage: (
      message: import('./worker-types').RequestMessageType,
      transfers?: [OffscreenCanvas | undefined]
    ) => void
  }
}
