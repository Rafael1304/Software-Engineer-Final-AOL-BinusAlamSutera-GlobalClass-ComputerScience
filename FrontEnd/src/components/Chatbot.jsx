import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Chatbot({ onProceed }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    { sender: 'bot', text: t('chatbot_intro') }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const isReviewRequest = (text) => {
    const phrases = [
      'review', 'summary', 'explain', 'result', 'ready', 'analyze',
      'what did you find', 'tell me', 'what happened',
      'outliers', 'anomaly', 'report', 'anything wrong', 'data check'
    ]
    return phrases.some(p => text.includes(p))
  }

  const sendMessage = async () => {
    const userMsg = { sender: 'user', text: input }
    const newMessages = [...messages, userMsg]
    const lower = input.toLowerCase()

    setMessages(newMessages)
    setInput('')
    setIsTyping(true)

    let botReply = ""

    if (lower.includes("reset chat") || lower.includes("clear conversation")) {
      setTimeout(() => {
        setMessages([{ sender: 'bot', text: t('chatbot_intro') }])
        setIsTyping(false)
      }, 1000)
      return
    }

    if (lower.includes("reset") && lower.includes("result")) {
      try {
        await fetch('http://127.0.0.1:8000/reset')
        botReply = t('chatbot_reset_success')
      } catch {
        botReply = t('chatbot_reset_fail')
      }
    } else if (isReviewRequest(lower)) {
      try {
        const res = await fetch('http://127.0.0.1:8000/summary')
        const data = await res.json()

        if (data.total_rows) {
          botReply = `${t('chatbot_report_title')}\n\n${t('chatbot_report_intro', {
            anomalies: data.anomalies,
            total: data.total_rows,
            percent: data.percent
          })}\n\n${t('chatbot_report_advice', {
            level: data.percent > 5 ? t('significant') : t('minor')
          })}`
        } else {
          botReply = t('no_summary')
        }
      } catch {
        botReply = t('chatbot_summary_fail')
      }
    } else if (lower.includes('yes') || lower.includes('ya') || lower.includes('start')) {
      botReply = t('chatbot_yes')
      onProceed()
    } else {
      botReply = t('chatbot_no')
    }

    setTimeout(() => {
      setMessages([...newMessages, { sender: 'bot', text: botReply }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="card p-4 border rounded-md shadow max-w-xl">
      <h3 className="text-lg font-semibold mb-2">{t('Your Personal Chatbot') || 'Chatbot'}</h3>
      <div className="h-64 overflow-y-auto space-y-2 text-sm bg-gray-50 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'bot' ? 'text-left' : 'text-right'}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
        {isTyping && <div className="italic text-gray-500">Bot is typing...</div>}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chatbot_prompt')}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t('send')}
        </button>
      </div>
    </div>
  )
}

export default Chatbot
