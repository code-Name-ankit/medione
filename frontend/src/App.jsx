import { useState } from "react";
import SearchBar from "./components/SearchBar";
import StoreList from "./components/StoreList";
import MapView from "./components/MapView";

function App() {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>💊 MediHelp</h1>

      <SearchBar setStores={setStores} setUserLocation={setUserLocation} />

      <StoreList stores={stores} />

      <MapView stores={stores} userLocation={userLocation} />
    </div>
  );
}

export default App;