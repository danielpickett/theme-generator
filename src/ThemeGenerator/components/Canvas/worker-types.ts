export type RequestMessageType =
  | {
      type: 'initCanvas'
      canvas?: OffscreenCanvas
      size: number
    }
  | {
      type: 'paintChroma'
      hue: number
      size: number
    }
  | {
      type: 'paintMask'
      hue: number
      size: number
    }
