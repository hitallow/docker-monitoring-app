const convertUnits = (value: string): Number => {
  const casts = {
    // binary
    b: 0.001,
    kib: 1024,
    mib: 1024 ** 2,
    gib: 1024 ** 3,
    tib: 1024 ** 4,
    pib: 1024 ** 5,
    eib: 1024 ** 6,
    // decimal
    kb: 10 ** 3,
    mb: 10 ** 6,
    gb: 10 ** 9,
    tb: 10 ** 12,
    pb: 10 ** 15,
    eb: 10 ** 18,
  }

  const number = parseFloat(value.replace(/[a-z]/g, '').trim())
  const unit = value
    .replace(/[0-9/.]/g, '')
    .trim()
    .toLowerCase()

  if (unit === 'kb') {
    return number
  }

  return number * casts[unit]
}

export { convertUnits }
