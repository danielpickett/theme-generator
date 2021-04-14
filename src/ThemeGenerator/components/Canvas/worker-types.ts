export type RequestMessageType =
  | {
      type: 'getMask'
      hue: number
      requestTime?: number
    }
  | {
      type: 'getChroma'
      requestTime?: number
    }
  | {
      type: 'updateHue'
      hue: number
      requestTime?: number
    }

export type ResponseMessageType =
  | {
      type: 'maskBitmap'
      bitmap: ImageBitmap

      requestTime?: number
    }
  | {
      type: 'chromaBitmap'
      bitmap: ImageBitmap

      requestTime?: number
    }
  | {
      type: 'hueStateUpdate'
      stateHue: number
      requestHue: number
      requestTime?: number
    }
