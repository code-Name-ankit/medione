import { useState } from "react";

function SearchBar({ setStores, setUserLocation }) {
  const [medicine, setMedicine] = useState("");

  const handleSearch = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log("User Location:", lat, lng);
      
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
    });
  };

  return (
    <div>
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