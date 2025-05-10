import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function ShareResult({ imageUrl }) {
  const { t } = useTranslation()
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/summary')
      .then(res => {
        if (!res.ok) throw new Error('No data available')
        return res.json()
      })
      .then(data => setSummary(data))
      .catch(err => setError(err.message))
  }, [])

  const handleReset = async () => {
    await fetch('http://127.0.0.1:8000/reset')
    window.location.reload()
  }

  return (
    <div className="container">
      <h3>{t('result_heading')}</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && summary.total_rows ? (
        <>
          <p><strong>{t('chatbot_summary_prefix')}:</strong> {summary.message}</p>
          <p>{summary.anomalies} anomalies / {summary.total_rows} total</p>
          <p>{summary.percent}% anomalous data</p>
        </>
      ) : (
        <p>{t('no_summary')}</p>
      )}

      {imageUrl && (
        <div style={{ margin: '16px 0' }}>
          <img src={imageUrl} alt="Anomaly Chart" style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
        </div>
      )}

      <button onClick={handleReset}>🔄 {t('chatbot_reset_success')}</button>
    </div>
  )
}

export default ShareResult
