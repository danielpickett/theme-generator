// https://www.webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
export const clamp = (value: number, limit1: number, limit2: number) => {
  const min = Math.min(limit1, limit2)
  const max = Math.max(limit1, limit2)
  return Math.max(Math.min(value, max), min)
}
