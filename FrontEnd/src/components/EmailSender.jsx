import React, { useEffect, useState } from 'react'
import emailjs from 'emailjs-com'

function EmailSender() {
  const [email, setEmail] = useState('')
  const [summary, setSummary] = useState(null)
  const [imageBlob, setImageBlob] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    // Load summary
    fetch('http://127.0.0.1:8000/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(() => setSummary(null))

    // Load chart image
    fetch('http://127.0.0.1:8000/chart')
      .then(res => res.blob())
      .then(setImageBlob)
      .catch(() => setImageBlob(null))
  }, [])

  const handleSend = () => {
    if (!summary || !email || !imageBlob) {
      alert('Missing summary or image')
      return
    }

    const imageUrl = URL.createObjectURL(imageBlob)

    const templateParams = {
      to_email: email,
      name: 'Fitrack Anomaly Bot',
      time: new Date().toLocaleString(),
      message: summary.message,
      anomalies: summary.anomalies,
      total_rows: summary.total_rows,
      percent: summary.percent,
      image_url: imageUrl
    }

    emailjs.send(
      'service_kfs7jgp',       // Replace with your actual EmailJS service ID
      'template_45psgim',      // Replace with your actual template ID
      templateParams,
      'xsIIEskp8ygoBsbbo'      // Replace with your actual public key
    )
      .then(() => setStatus('✅ Email sent successfully!'))
      .catch((err) => setStatus(`❌ Failed to send: ${err.text || err}`))
  }

  return (
    <div className="container">
      <h3>📤 Share Result via Email</h3>
      <input
        type="email"
        placeholder="Recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend}>📩 Send Result</button>
      <p>{status}</p>
    </div>
  )
}

export default EmailSender
