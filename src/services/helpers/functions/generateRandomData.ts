export function generateRandomData(size: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const len = chars.length
  const randomData = []

  let acc = 0

  while (acc < size) {
    // eslint-disable-next-line no-bitwise
    randomData.push(chars[(Math.random() * len) | 0])
    acc += 1
  }

  return randomData.join('')
}
