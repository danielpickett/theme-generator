declare module 'worker-loader!./worker' {
  export default class MaskWorker extends Worker {
    constructor()
    new(stringUrl: string | URL, options?: WorkerOptions | undefined): Worker
    postMessage: (message: import('./worker').RequestMessageType) => void
    onmessage: (
      event: MessageEvent<import('./worker').ResponseMessageType>
    ) => void
  }
}
