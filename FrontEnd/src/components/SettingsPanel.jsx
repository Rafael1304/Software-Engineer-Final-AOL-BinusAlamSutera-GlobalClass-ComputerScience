import React from 'react'
import { useTranslation } from 'react-i18next'

function SettingsPanel({ dark, toggleDark }) {
  const { i18n, t } = useTranslation()

  return (
    <div className="container">
      <h3>{t('settings_title')}</h3>

      <button onClick={toggleDark}>
        {dark ? '☀️ ' + t('light_mode') : '🌙 ' + t('dark_mode')}
      </button>

      <div style={{ marginTop: '10px' }}>
        <label>{t('choose_language')}:</label>
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="id">Bahasa</option>
        </select>
      </div>
    </div>
  )
}

export default SettingsPanel
