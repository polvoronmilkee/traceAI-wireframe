import { useState } from 'react'
import '../styles/ChatbotScreen.css'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface ChatbotScreenProps {
  onBack: () => void
}

const botResponses: { [key: string]: string } = {
  'where': 'Where would you like to go? Tell me your destination!',
  'route': 'Popular routes include: Estancia → Roxas, Roxas → Estancia, and local Estancia routes.',
  'nearest': 'The nearest vehicle to you is a van arriving in 5 minutes on the Estancia Local route.',
  'how': 'How can I help you? You can ask about routes, vehicles, or directions!',
  'time': 'Current time: 2:30 PM. Rush hour traffic may affect travel times.',
  'price': 'Typical fares range from P20-50 depending on distance and vehicle type.',
  'hello': 'Hello! Welcome to TraceAI. I\'m here to help you navigate public transportation.',
}

const getSuggestedResponses = () => [
  '🏠 Where can I go?',
  '🚌 What\'s the nearest bus?',
  '📍 Route suggestions',
  '⏱️ How long does it take?',
  '💰 How much does it cost?',
]

export default function ChatbotScreen({ onBack }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m TraceAI Assistant. Where would you like to go today? I can help you find the best routes and vehicles.',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    for (const key in botResponses) {
      if (lowerMessage.includes(key)) {
        return botResponses[key]
      }
    }
    return 'I can help you find vehicles and routes. Could you tell me more about where you\'d like to go?'
  }

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text,
      timestamp: new Date(),
    }

    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      type: 'bot',
      text: generateBotResponse(text),
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage, botResponse])
    setInputText('')
  }

  return (
    <div className="chatbot-screen">
      <div className="chatbot-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>TraceAI Assistant</h2>
        <div></div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">
              {msg.type === 'bot' && <span className="bot-label">🤖</span>}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="suggested-prompts">
          <p>Quick suggestions:</p>
          <div className="prompts-grid">
            {getSuggestedResponses().map((prompt, idx) => (
              <button
                key={idx}
                className="prompt-btn"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="chat-input"
        />
        <button
          className="send-btn"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
        >
          Send
        </button>
      </div>

      <div className="sms-fallback-info">
        <p>📱 No internet? Text your location and destination to +63-XXX-TRACE-AI for immediate assistance!</p>
      </div>
    </div>
  )
}
