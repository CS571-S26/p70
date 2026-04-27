const SETTINGS_STORAGE_KEY = 'visualml.settings'

const SETTINGS_VERSION = 1
const VALID_THEMES = ['light', 'dark']
const VALID_MODELS = ['logistic-regression', 'knn', 'pca']
const DATASET_SIZE_MIN = 20
const DATASET_SIZE_MAX = 500
const NOISE_MIN = 0
const NOISE_MAX = 1

const DEFAULT_SETTINGS = {
  version: SETTINGS_VERSION,
  updatedAt: '',
  theme: 'light',
  highContrast: false,
  reducedMotion: false,
  defaultModel: 'logistic-regression',
  defaultDatasetSize: 80,
  defaultNoise: 0.4,
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function toBoolean(value, fallback = false) {
  return typeof value === 'boolean' ? value : fallback
}

function toNumber(value, fallback) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function toValidDateString(value, fallback = '') {
  if (typeof value !== 'string' || value.trim() === '') {
    return fallback
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString()
}

function getStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null
    }
    return window.localStorage
  } catch {
    return null
  }
}

function sanitizeSettings(rawSettings) {
  const source = rawSettings && typeof rawSettings === 'object' ? rawSettings : {}
  const base = {
    ...DEFAULT_SETTINGS,
    ...source,
  }

  const theme = VALID_THEMES.includes(base.theme) ? base.theme : DEFAULT_SETTINGS.theme
  const defaultModel = VALID_MODELS.includes(base.defaultModel) ? base.defaultModel : DEFAULT_SETTINGS.defaultModel
  const defaultDatasetSize = clamp(
    Math.round(toNumber(base.defaultDatasetSize, DEFAULT_SETTINGS.defaultDatasetSize)),
    DATASET_SIZE_MIN,
    DATASET_SIZE_MAX,
  )
  const defaultNoise = clamp(
    toNumber(base.defaultNoise, DEFAULT_SETTINGS.defaultNoise),
    NOISE_MIN,
    NOISE_MAX,
  )

  return {
    version: SETTINGS_VERSION,
    updatedAt: toValidDateString(base.updatedAt, DEFAULT_SETTINGS.updatedAt),
    theme,
    highContrast: toBoolean(base.highContrast, DEFAULT_SETTINGS.highContrast),
    reducedMotion: toBoolean(base.reducedMotion, DEFAULT_SETTINGS.reducedMotion),
    defaultModel,
    defaultDatasetSize,
    defaultNoise,
  }
}

function getSettings() {
  const storage = getStorage()
  if (!storage) {
    return sanitizeSettings(DEFAULT_SETTINGS)
  }

  try {
    const rawValue = storage.getItem(SETTINGS_STORAGE_KEY)
    if (!rawValue) {
      return sanitizeSettings(DEFAULT_SETTINGS)
    }

    const parsed = JSON.parse(rawValue)
    return sanitizeSettings(parsed)
  } catch {
    return sanitizeSettings(DEFAULT_SETTINGS)
  }
}

function saveSettings(settings) {
  const storage = getStorage()
  const sanitized = sanitizeSettings(settings)
  const payload = {
    ...sanitized,
    version: SETTINGS_VERSION,
    updatedAt: new Date().toISOString(),
  }

  if (!storage) {
    return payload
  }

  try {
    storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    return payload
  }

  return payload
}

function resetSettings() {
  return saveSettings(DEFAULT_SETTINGS)
}

export {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  getSettings,
  saveSettings,
  resetSettings,
  sanitizeSettings,
}
