export type RequestMessageEvent = MessageEvent<{
  hue: number
  size: number
}>
export type ResponseMessageEvent = MessageEvent<ImageBitmap>
