export type RequestMessageType =
  | {
      type: 'initCanvas'
      canvas?: OffscreenCanvas
    }
  | {
      type: 'paintChroma'
      hue: number
    }
  | {
      type: 'paintMask'
      hue: number
    }
