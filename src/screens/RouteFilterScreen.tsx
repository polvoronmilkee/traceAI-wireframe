import { useState } from 'react'
import '../styles/RouteFilterScreen.css'

interface RouteFilterScreenProps {
  onBack: () => void
}

const availableLocations = [
  'Estancia',
  'Roxas',
  'Downtown',
  'Airport',
  'Station',
  'Market',
]

const popularRoutes = [
  { name: 'Estancia → Roxas', distance: '8 km', vehicles: 12 },
  { name: 'Roxas → Estancia', distance: '8 km', vehicles: 10 },
  { name: 'Estancia Local', distance: '5 km', vehicles: 15 },
  { name: 'Roxas → Downtown', distance: '12 km', vehicles: 8 },
  { name: 'Estancia → Airport', distance: '25 km', vehicles: 5 },
  { name: 'Downtown → Station', distance: '3 km', vehicles: 20 },
]

export default function RouteFilterScreen({ onBack }: RouteFilterScreenProps) {
  const [startLocation, setStartLocation] = useState('')
  const [endLocation, setEndLocation] = useState('')
  const [vehicleType, setVehicleType] = useState<'all' | 'bus' | 'minibus' | 'van'>(
    'all'
  )
  const [filterResults, setFilterResults] = useState<typeof popularRoutes>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (startLocation && endLocation) {
      // Simulate filtering
      const results = popularRoutes.filter((route) => {
        const matchRoute =
          route.name.toLowerCase().includes(startLocation.toLowerCase()) &&
          route.name.toLowerCase().includes(endLocation.toLowerCase())
        return matchRoute
      })
      setFilterResults(results.length > 0 ? results : popularRoutes.slice(0, 3))
      setHasSearched(true)
    }
  }

  return (
    <div className="route-filter-screen">
      <div className="filter-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Route Filter</h2>
        <div></div>
      </div>

      <div className="filter-form">
        <div className="form-group">
          <label>Starting Location</label>
          <select
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="select-input"
          >
            <option value="">Select location...</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="swap-btn-container">
          <button className="swap-btn">⇅ Swap</button>
        </div>

        <div className="form-group">
          <label>Destination</label>
          <select
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="select-input"
          >
            <option value="">Select location...</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Vehicle Type</label>
          <div className="vehicle-type-selector">
            {['all', 'bus', 'minibus', 'van'].map((type) => (
              <button
                key={type}
                className={`type-btn ${vehicleType === type ? 'active' : ''}`}
                onClick={() =>
                  setVehicleType(type as 'all' | 'bus' | 'minibus' | 'van')
                }
              >
                {type === 'all' && 'All'}
                {type === 'bus' && '🚌 Buses'}
                {type === 'minibus' && '🚐 Mini'}
                {type === 'van' && '🚐 Vans'}
              </button>
            ))}
          </div>
        </div>

        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={!startLocation || !endLocation}
        >
          🔍 Search Routes
        </button>
      </div>

      {hasSearched && (
        <div className="filter-results">
          <h3>Available Routes</h3>
          <div className="routes-list">
            {filterResults.map((route, idx) => (
              <div key={idx} className="route-item">
                <div className="route-info">
                  <h4>{route.name}</h4>
                  <div className="route-details">
                    <span>📏 {route.distance}</span>
                    <span>🚌 {route.vehicles} vehicles</span>
                  </div>
                </div>
                <button className="select-route-btn">Select</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasSearched && (
        <div className="popular-routes">
          <h3>Popular Routes</h3>
          <div className="routes-list">
            {popularRoutes.map((route, idx) => (
              <div key={idx} className="route-item">
                <div className="route-info">
                  <h4>{route.name}</h4>
                  <div className="route-details">
                    <span>📏 {route.distance}</span>
                    <span>🚌 {route.vehicles} vehicles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
