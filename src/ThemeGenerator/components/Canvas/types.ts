export type RequestMessageEvent = MessageEvent<{
  hue: number
  size: number
}>

type ResponseData = { hue: number; size: number; bitmap: ImageBitmap }

export type ResponseMessageEvent = MessageEvent<ResponseData>

export type WorkerContext = {
  onmessage: (event: RequestMessageEvent) => void
  postMessage: (data: ResponseData) => void
}

export type WorkerState = {
  size: number
  hue: number
  hasRenderPending: boolean
}

export type OnBitmapResponseData = {
  type: 'chroma' | 'mask'
  hue: number
  size: number
}
