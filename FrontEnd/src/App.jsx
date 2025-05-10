import React, { useState, useEffect } from 'react'
import './index.css'
import Chatbot from './components/Chatbot'
import FileUploader from './components/FileUploader'
import ShareResult from './components/ShareResult'
import SettingsPanel from './components/SettingsPanel'
import EmailSender from './components/EmailSender'
import i18n from 'i18next'

function App() {
  const [section, setSection] = useState('chat')
  const [dark, setDark] = useState(false)
  const [showUploader, setShowUploader] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <h2>{i18n.t('menu_title') || 'Menu'}</h2>

        <button onClick={() => setSection('chat')}>💬 {i18n.t('menu_chat')}</button>
        <button onClick={() => setSection('upload')}>📤 {i18n.t('menu_upload')}</button>
        <button onClick={() => setSection('view')}>📊 {i18n.t('menu_result')}</button>
        <button onClick={() => setSection('Share')}>✉️ {i18n.t('menu_share') || 'Send Email'}</button>
        <button onClick={() => setSection('settings')}>⚙️ {i18n.t('menu_settings')}</button>

        <hr />
        <button onClick={() => setDark(!dark)}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="id">Bahasa</option>
        </select>
      </div>

      <div className="main">
        <header>{i18n.t('title') || 'My Anomaly App'}</header>

        <section style={{ marginTop: '1.5rem' }}>
          {section === 'chat' && (
            <Chatbot
              onProceed={() => {
                setShowUploader(true)
                setSection('upload')
              }}
              messages={chatMessages}
              setMessages={setChatMessages}
            />
          )}

          {section === 'upload' && showUploader && (
            <FileUploader setImageUrl={setImageUrl} />
          )}

          {section === 'view' && <ShareResult imageUrl={imageUrl} />}

          {section === 'share' && (
            <EmailSender imageUrl={imageUrl} />
          )}

          {section === 'settings' && (
            <SettingsPanel
              dark={dark}
              toggleDark={() => setDark(!dark)}
              messages={chatMessages}
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default App
