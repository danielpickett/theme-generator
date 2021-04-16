export type RequestMessageType =
  | {
      type: 'getChroma'
      hue: number
      requestTime: number
    }
  | {
      type: 'getMask'
      hue: number
      requestTime: number
    }

export type ResponseMessageType =
  | {
      type: 'chromaBitmap'
      bitmap: ImageBitmap
      hue: number
      requestTime: number
    }
  | {
      type: 'maskBitmap'
      bitmap: ImageBitmap
      hue: number
      requestTime: number
    }
