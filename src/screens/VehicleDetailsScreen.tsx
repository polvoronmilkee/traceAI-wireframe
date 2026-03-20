import '../styles/VehicleDetailsScreen.css'

interface Vehicle {
  id: string
  type: 'bus' | 'minibus' | 'van'
  route: string
  eta: number
  lat: number
  lng: number
  occupancy: number
}

interface VehicleDetailsScreenProps {
  vehicle: Vehicle | null
  onBack: () => void
}

export default function VehicleDetailsScreen({
  vehicle,
  onBack,
}: VehicleDetailsScreenProps) {
  if (!vehicle) {
    return (
      <div className="vehicle-details-screen">
        <div className="details-header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h2>Vehicle Details</h2>
          <div></div>
        </div>
        <p>No vehicle selected</p>
      </div>
    )
  }

  const vehicleEmoji =
    vehicle.type === 'bus' ? '🚌' : vehicle.type === 'minibus' ? '🚐' : '🚐'
  const occupancyStatus =
    vehicle.occupancy < 50
      ? 'Available'
      : vehicle.occupancy < 80
        ? 'Getting Full'
        : 'Very Full'

  return (
    <div className="vehicle-details-screen">
      <div className="details-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Vehicle Details</h2>
        <div></div>
      </div>

      <div className="vehicle-card-large">
        <div className="vehicle-icon-large">{vehicleEmoji}</div>
        <h2 className="vehicle-id">{vehicle.id.toUpperCase()}</h2>

        <div className="detail-row">
          <span className="detail-label">Route</span>
          <span className="detail-value">{vehicle.route}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Estimated Arrival</span>
          <span className="detail-value eta">{vehicle.eta} minutes</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Vehicle Type</span>
          <span className="detail-value">{vehicle.type.toUpperCase()}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Occupancy</span>
          <div className="occupancy-bar">
            <div
              className="occupancy-fill"
              style={{ width: `${vehicle.occupancy}%` }}
            ></div>
          </div>
          <span className="detail-value">{vehicle.occupancy}%</span>
        </div>

        <div className="occupancy-status">
          <span className={`status ${occupancyStatus.toLowerCase().replace(' ', '-')}`}>
            {occupancyStatus}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Current Location</span>
          <span className="detail-value">
            {vehicle.lat.toFixed(4)}°, {vehicle.lng.toFixed(4)}°
          </span>
        </div>

        <div className="action-buttons">
          <button className="action-btn primary">📍 Set as Destination</button>
          <button className="action-btn secondary">📱 Share Route</button>
        </div>

        <div className="additional-info">
          <h3>Additional Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">⏱️ Expected Wait</span>
              <span className="info-value">{vehicle.eta} min</span>
            </div>
            <div className="info-item">
              <span className="info-label">👥 Capacity</span>
              <span className="info-value">Std</span>
            </div>
            <div className="info-item">
              <span className="info-label">💰 Estimated Fare</span>
              <span className="info-value">P25-50</span>
            </div>
            <div className="info-item">
              <span className="info-label">📲 Driver Rating</span>
              <span className="info-value">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="route-path">
          <h3>Route Path</h3>
          <div className="route-stops">
            {['Current Stop', 'Next Stop 1', 'Next Stop 2', 'Next Stop 3'].map(
              (stop, idx) => (
                <div key={idx} className="stop">
                  <div className="stop-indicator"></div>
                  <span>{stop}</span>
                </div>
              )
            )}
          </div>
        </div>

        <button className="board-btn">🚌 Board This Vehicle</button>
      </div>
    </div>
  )
}
