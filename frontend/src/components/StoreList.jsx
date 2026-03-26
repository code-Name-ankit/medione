function StoreList({ stores }) {
  return (
    <div>
      <h2>Nearby Stores</h2>

      {stores.map((item, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{item.storeName}</h3>
          <p>{item.address}</p>
          <p>💊 {item.medicine}</p>
          <p>💰 ₹{item.price}</p>
          <p>📍 {item.distance} km</p>
        </div>
      ))}
    </div>
  );
}

export default StoreList;