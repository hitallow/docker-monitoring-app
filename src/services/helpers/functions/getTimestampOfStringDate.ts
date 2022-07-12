const getTimestampOfStringDate = (strDate: string) => {
  const dt = Date.parse(strDate)
  return parseInt(`${dt / 1000}`, 10)
}

export { getTimestampOfStringDate }
