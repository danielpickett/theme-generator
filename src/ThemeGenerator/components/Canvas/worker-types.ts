export type RequestMessageType =
  | {
      type: 'initCanvas'
      canvas?: OffscreenCanvas
      size: number
    }
  | {
      type: 'paintChroma'
      hue: number
    }
  | {
      type: 'paintMask'
      hue: number
    }
