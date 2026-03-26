import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setStores, setUserLocation, setLoading }) {
  const [medicine, setMedicine] = useState("");

  const handleSearch = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setUserLocation({ lat, lng });

      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ medicine, lat, lng })
      });

      const data = await res.json();
      setStores(data);

      setLoading(false);
    });
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search medicine..."
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;