import { createContext, useContext, useEffect, useState } from 'react'

import { getSettings, resetSettings, sanitizeSettings, saveSettings } from '../utils/settingsStorage'

const SettingsContext = createContext(null)

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => getSettings())

  useEffect(() => {
    if (typeof document === 'undefined' || !document.body) {
      return
    }

    const body = document.body

    body.classList.remove('high-contrast', 'reduced-motion')
    body.dataset.theme = settings.theme
    body.classList.toggle('high-contrast', settings.highContrast)
    body.classList.toggle('reduced-motion', settings.reducedMotion)
  }, [settings.highContrast, settings.reducedMotion, settings.theme])

  function updateSetting(key, value) {
    setSettings((previousSettings) => {
      const nextSettings = sanitizeSettings({
        ...previousSettings,
        [key]: value,
      })
      return saveSettings(nextSettings)
    })
  }

  function resetAllSettings() {
    setSettings(resetSettings())
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        updateSetting,
        resetAllSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export { SettingsContext, SettingsProvider, useSettings }
