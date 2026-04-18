function mulberry32(seed) {
  let t = seed >>> 0
  return function nextRandom() {
    t += 0x6d2b79f5
    let value = Math.imul(t ^ (t >>> 15), t | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function gaussianRandom(random) {
  let u = 0
  let v = 0

  while (u === 0) {
    u = random()
  }

  while (v === 0) {
    v = random()
  }

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createPoint(index, label, centerX, centerY, spread, random) {
  const x = clamp(centerX + gaussianRandom(random) * spread, -3, 3)
  const y = clamp(centerY + gaussianRandom(random) * spread, -3, 3)

  return {
    id: `${label}-${index}`,
    x,
    y,
    label,
  }
}

function generateTwoClassDataset({ size = 80, noise = 0.2, seed = 42 } = {}) {
  const safeSize = Math.max(20, Math.floor(size))
  const safeNoise = clamp(noise, 0, 1)
  const safeSeed = Number.isFinite(seed) ? Math.floor(seed) : 0

  const random = mulberry32(safeSeed)
  const spread = 0.2 + safeNoise * 1.1
  const classACount = Math.floor(safeSize / 2)
  const classBCount = safeSize - classACount

  const points = [
    ...Array.from({ length: classACount }, (_, index) => createPoint(index, 0, -1, -1, spread, random)),
    ...Array.from({ length: classBCount }, (_, index) => createPoint(index, 1, 1, 1, spread, random)),
  ]

  return {
    points,
    meta: {
      size: safeSize,
      noise: safeNoise,
      seed: safeSeed,
      classCounts: {
        classA: classACount,
        classB: classBCount,
      },
    },
  }
}

function rotatePoint(x, y, angleRadians) {
  const cos = Math.cos(angleRadians)
  const sin = Math.sin(angleRadians)

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  }
}

function generatePointCloudDataset({ size = 80, noise = 0.2, seed = 42 } = {}) {
  const safeSize = Math.max(20, Math.floor(size))
  const safeNoise = clamp(noise, 0, 1)
  const safeSeed = Number.isFinite(seed) ? Math.floor(seed) : 0

  const random = mulberry32(safeSeed)
  const baseAngle = ((safeSeed % 360) * Math.PI) / 180
  const majorSpread = 1.25 + safeNoise * 0.65
  const minorSpread = 0.35 + safeNoise * 0.75

  const points = Array.from({ length: safeSize }, (_, index) => {
    const major = gaussianRandom(random) * majorSpread
    const minor = gaussianRandom(random) * minorSpread
    const rotated = rotatePoint(major, minor, baseAngle)

    return {
      id: `p-${index}`,
      x: clamp(rotated.x, -3, 3),
      y: clamp(rotated.y, -3, 3),
    }
  })

  return {
    points,
    meta: {
      size: safeSize,
      noise: safeNoise,
      seed: safeSeed,
      baseAngleDegrees: (safeSeed % 360 + 360) % 360,
    },
  }
}

export { generatePointCloudDataset, generateTwoClassDataset }
