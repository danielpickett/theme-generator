export type RequestMessageEvent = MessageEvent<{
  hue: number
}>

type ResponseData = { hue: number; bitmap: ImageBitmap }

export type ResponseMessageEvent = MessageEvent<ResponseData>

export type WorkerContext = {
  onmessage: (event: RequestMessageEvent) => void
  postMessage: (data: ResponseData) => void
}

export type WorkerState = {
  hue: number
  hasRenderPending: boolean
}
