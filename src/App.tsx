import { useState } from 'react'
import './App.css'
import MapScreen from './screens/MapScreen'
import ChatbotScreen from './screens/ChatbotScreen'
import RouteFilterScreen from './screens/RouteFilterScreen'
import VehicleDetailsScreen from './screens/VehicleDetailsScreen'

type ScreenType = 'map' | 'chatbot' | 'filter' | 'vehicle-details'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('map')
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setCurrentScreen('vehicle-details')
  }

  const handleBack = () => {
    setCurrentScreen('map')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚌 TraceAI</h1>
        <p className="subtitle">Smart Public Transportation Navigation</p>
      </header>

      <main className="app-content">
        {currentScreen === 'map' && (
          <MapScreen 
            onVehicleSelect={handleVehicleSelect}
            onOpenFilter={() => setCurrentScreen('filter')}
            onOpenChatbot={() => setCurrentScreen('chatbot')}
          />
        )}
        {currentScreen === 'chatbot' && (
          <ChatbotScreen onBack={handleBack} />
        )}
        {currentScreen === 'filter' && (
          <RouteFilterScreen onBack={handleBack} />
        )}
        {currentScreen === 'vehicle-details' && (
          <VehicleDetailsScreen vehicle={selectedVehicle} onBack={handleBack} />
        )}
      </main>

      <nav className="bottom-nav">
        <button 
          className={`nav-btn ${currentScreen === 'map' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('map')}
        >
          📍 Map
        </button>
        <button 
          className={`nav-btn ${currentScreen === 'filter' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('filter')}
        >
          🔍 Filter
        </button>
        <button 
          className={`nav-btn ${currentScreen === 'chatbot' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('chatbot')}
        >
          💬 Chatbot
        </button>
      </nav>
    </div>
  )
}

export default App

