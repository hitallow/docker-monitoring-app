export function startInterval(seconds: number, callback: () => any) {
  callback()
  return setInterval(callback, seconds * 1000)
}
