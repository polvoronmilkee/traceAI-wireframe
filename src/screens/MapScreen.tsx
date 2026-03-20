import { useState } from 'react'
import '../styles/MapScreen.css'

interface Vehicle {
  id: string
  type: 'bus' | 'minibus' | 'van'
  route: string
  eta: number
  lat: number
  lng: number
  occupancy: number
}

interface MapScreenProps {
  onVehicleSelect: (vehicle: Vehicle) => void
  onOpenFilter: () => void
  onOpenChatbot: () => void
}

const mockVehicles: Vehicle[] = [
  {
    id: 'ceres-001',
    type: 'bus',
    route: 'Estancia → Roxas',
    eta: 5,
    lat: 14.0995,
    lng: 121.5437,
    occupancy: 45,
  },
  {
    id: 'minibus-002',
    type: 'minibus',
    route: 'Roxas → Estancia',
    eta: 12,
    lat: 14.1025,
    lng: 121.5467,
    occupancy: 60,
  },
  {
    id: 'van-003',
    type: 'van',
    route: 'Estancia Local',
    eta: 8,
    lat: 14.0975,
    lng: 121.5420,
    occupancy: 75,
  },
  {
    id: 'bus-004',
    type: 'bus',
    route: 'Estancia → Roxas',
    eta: 18,
    lat: 14.1000,
    lng: 121.5500,
    occupancy: 30,
  },
]

export default function MapScreen({
  onVehicleSelect,
  onOpenFilter,
  onOpenChatbot,
}: MapScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedDestination, setSelectedDestination] = useState<string>('')

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'bus':
        return '#FFD700' // Yellow
      case 'minibus':
        return '#00AA00' // Green
      case 'van':
        return '#0066FF' // Blue
      default:
        return '#999'
    }
  }

  return (
    <div className="map-screen">
      <div className="map-header">
        <h2>Real-Time Vehicle Tracking</h2>
        <button className="chatbot-btn" onClick={onOpenChatbot}>
          💬 Ask AI Assistant
        </button>
      </div>

      <div className="location-inputs">
        <input
          type="text"
          placeholder="📍 Your Location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="🏁 Destination"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="input-field"
        />
        <button className="filter-btn" onClick={onOpenFilter}>
          🔍 Filter Routes
        </button>
      </div>

      <div className="map-container">
        <div className="map-placeholder">
          <svg viewBox="0 0 400 500" className="map-svg">
            {/* Simple map background */}
            <rect width="400" height="500" fill="#f0f0f0" />
            <text x="200" y="250" textAnchor="middle" fontSize="16" fill="#999">
              Map View Placeholder
            </text>

            {/* Vehicle pins */}
            {mockVehicles.map((vehicle) => (
              <g key={vehicle.id}>
                <circle
                  cx={200 + Math.random() * 100}
                  cy={250 + Math.random() * 100}
                  r="12"
                  fill={getVehicleColor(vehicle.type)}
                  stroke="#333"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onVehicleSelect(vehicle)}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="vehicles-list">
        <h3>Available Vehicles</h3>
        <div className="vehicles-grid">
          {mockVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="vehicle-card"
              onClick={() => onVehicleSelect(vehicle)}
            >
              <div className="vehicle-header">
                <span
                  className="vehicle-pin"
                  style={{ backgroundColor: getVehicleColor(vehicle.type) }}
                >
                  {vehicle.type === 'bus' ? '🚌' : vehicle.type === 'minibus' ? '🚐' : '🚐'}
                </span>
                <span className="vehicle-route">{vehicle.route}</span>
              </div>
              <div className="vehicle-details">
                <div className="detail-item">
                  <span className="label">ETA:</span>
                  <span className="value">{vehicle.eta} min</span>
                </div>
                <div className="detail-item">
                  <span className="label">Occupancy:</span>
                  <span className="value">{vehicle.occupancy}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="pin" style={{ backgroundColor: '#FFD700' }}></div>
          <span>Ceres Buses</span>
        </div>
        <div className="legend-item">
          <div className="pin" style={{ backgroundColor: '#00AA00' }}></div>
          <span>Mini Buses</span>
        </div>
        <div className="legend-item">
          <div className="pin" style={{ backgroundColor: '#0066FF' }}></div>
          <span>Vans</span>
        </div>
      </div>
    </div>
  )
}
