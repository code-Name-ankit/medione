import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

// 🔴 User Icon
const userIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

// 🔵 Store Icon
const storeIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

// 🟢 Nearest Icon
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

// 🔥 Map Auto Focus Component
function AutoFocus({ stores }) {
  const map = useMap();

  useEffect(() => {
    if (!stores.length) return;

    const nearest = stores[0];
    const lat = nearest.location.coordinates[1];
    const lng = nearest.location.coordinates[0];

    // 🔥 Focus + Zoom
    map.setView([lat, lng], 15);
  }, [stores, map]);

  return null;
}

function MapView({ stores, userLocation }) {
  if (!userLocation) return null;

  // 🔥 Sort stores
  const sortedStores = [...stores].sort((a, b) => a.distance - b.distance);

  // 🔥 Ref for popup
  const markerRefs = useRef([]);

  useEffect(() => {
    if (markerRefs.current[0]) {
      markerRefs.current[0].openPopup(); // auto open nearest popup
    }
  }, [sortedStores]);

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: "400px", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔥 Auto focus */}
      <AutoFocus stores={sortedStores} />

      {/* 🔴 User */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* 🟢🔵 Stores */}
      {sortedStores.map((item, index) => {
        if (!item.location) return null;

        const lat = item.location.coordinates[1];
        const lng = item.location.coordinates[0];

        const icon = index === 0 ? greenIcon : storeIcon;

        return (
          <Marker
            key={index}
            position={[lat, lng]}
            icon={icon}
            ref={(el) => (markerRefs.current[index] = el)}
          >
            <Popup>
              <b>{item.storeName}</b> <br />
              💊 {item.medicine} <br />
              💰 ₹{item.price} <br />
              📍 {item.distance} km <br />
              {index === 0 && <b>🟢 Nearest</b>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;