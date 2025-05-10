import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function FileUploader({ setImageUrl }) {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return

    setStatus(t('uploading'))

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
        setStatus(t('upload_success'))
      } else {
        setStatus(t('upload_fail'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      setStatus(t('upload_fail'))
    }
  }

  return (
    <div className="container">
      <h3>{t('file_upload_title')}</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleUpload}>{t('analyze_now')}</button>
      <p>{status}</p>
    </div>
  )
}

export default FileUploader
