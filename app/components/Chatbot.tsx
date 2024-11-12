'use client'

import React, { useState } from 'react'
import styles from './chatbot.module.css'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.result.content }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.chatbotContainer}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className={styles.chatbotButton}>
          Chat
        </button>
      )}
      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <h3>Movie Chat</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>X</button>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.chatbotForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about movies or TV shows..."
              disabled={isLoading}
              className={styles.chatbotInput}
            />
            <button type="submit" disabled={isLoading} className={styles.sendButton}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}