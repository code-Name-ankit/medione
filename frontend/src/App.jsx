import { useState } from "react";
import SearchBar from "./components/SearchBar";
import StoreList from "./components/StoreList";
import MapView from "./components/MapView";
import "./App.css";

function App() {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="app">
      <h1 className="title">💊 MediHelp</h1>

      <SearchBar
        setStores={setStores}
        setUserLocation={setUserLocation}
        setLoading={setLoading}
      />

      {/* 📦 Store List */}
      <StoreList
        stores={stores}
        loading={loading}
        setSelectedStore={setSelectedStore}
      />

      {/* 🗺️ Map (only after click) */}
      {selectedStore && (
        <MapView
          stores={stores}
          userLocation={userLocation}
          selectedStore={selectedStore}
        />
      )}
    </div>
  );
}

export default App;