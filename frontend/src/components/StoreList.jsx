import "./StoreList.css";

function StoreList({ stores, loading, setSelectedStore }) {
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Searching nearby stores...</p>
      </div>
    );
  }

  // ✅ Remove duplicates & Sort
  const uniqueStores = stores.filter(
    (item, index, self) =>
      index === self.findIndex(s => s.storeName === item.storeName)
  );

  const sortedStores = [...uniqueStores].sort((a, b) => a.distance - b.distance);

  return (
    <div className="store-list-container">
      <h2 className="section-title">Nearby Pharmacies</h2>
      <div className="store-grid">
        {sortedStores.map((item, index) => (
          <div
            key={index}
            className={`store-card ${index === 0 ? "featured-card" : ""}`}
            onClick={() => setSelectedStore(item)}
          >
            <div className="card-header">
              <span className="store-icon">🏪</span>
              <div className="title-group">
                <h3>{item.storeName}</h3>
                <p className="address-text">{item.address}</p>
              </div>
              {index === 0 && <span className="nearest-badge">Nearest</span>}
            </div>

            <hr className="divider" />

            <div className="card-details">
              <div className="detail-item">
                <span className="label">Medicine:</span>
                <span className="value">💊 {item.medicine}</span>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Price:</span>
                  <span className="value price">₹{item.price}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Distance:</span>
                  <span className="value distance">{item.distance} km</span>
                </div>
              </div>
            </div>

            <button className="view-on-map-btn">View on Map</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreList;