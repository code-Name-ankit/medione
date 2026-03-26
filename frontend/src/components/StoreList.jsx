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

  // ✅ Remove duplicates
  const uniqueStores = stores.filter(
    (item, index, self) =>
      index === self.findIndex(s => s.storeName === item.storeName)
  );

  // ✅ Sort nearest first
  const sortedStores = [...uniqueStores].sort(
    (a, b) => a.distance - b.distance
  );

  return (
    <div className="store-list">
      {sortedStores.map((item, index) => (
        <div
          key={index}
          className={`card ${index === 0 ? "nearest" : ""}`}
          onClick={() => setSelectedStore(item)}
        >
          <h3>{item.storeName}</h3>

          {index === 0 && <span className="badge">Nearest</span>}

          <p>📍 {item.address}</p>
          <p>💊 {item.medicine}</p>
          <p>💰 ₹{item.price}</p>
          <p>📏 {item.distance} km</p>
        </div>
      ))}
    </div>
  );
}

export default StoreList;