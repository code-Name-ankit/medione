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
    <div className="app-container">
      {/* --- Exact Medione Navbar --- */}
      <nav className="medione-navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="plus-icon">+</span>
            <span className="logo-text">MEDIONE</span>
          </div>
          <ul className="nav-menu">
            <li className="active">Home</li>
            <li>Medicine Search</li>
            <li>Nearby Shops</li>
            <li>Lab Reports</li>
            <li>First Aid Tips</li>
            <li>About Us</li>
          </ul>
        </div>
      </nav>

      {/* --- Hero Section: Cards Layout --- */}
      <header className="hero-section">
        <div className="card-grid">
          {/* Welcome Card */}
          <div className="ui-card welcome-card">
            <h2>Welcome to Medione</h2>
            <p>Your one-stop solution for medicines, lab reports, and first aid guidance.</p>
            <button className="btn-primary">Get Started</button>
          </div>

          {/* Search Card */}
          <div className="ui-card search-card">
            <div className="search-header-group">
               <h2>Search Medicines</h2>
               <img src="https://cdn-icons-png.flaticon.com/512/822/822143.png" alt="meds" className="card-img" />
            </div>
            <SearchBar
              setStores={setStores}
              setUserLocation={setUserLocation}
              setLoading={setLoading}
            />
          </div>
        </div>
      </header>

      {/* --- Results Section: List + Map Split --- */}
      <main className="content-area">
        {(stores.length > 0 || loading) && (
          <div className="results-container">
            <div className="list-side">
              <StoreList
                stores={stores}
                loading={loading}
                setSelectedStore={setSelectedStore}
              />
            </div>
            <div className="map-side">
              {selectedStore ? (
                <MapView
                  stores={stores}
                  userLocation={userLocation}
                  selectedStore={selectedStore}
                />
              ) : (
                <div className="map-placeholder">
                  <p>Select a store to view location on map</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;