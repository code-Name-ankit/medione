import Store from "../models/Store.js";
import Medicine from "../models/Medicine.js";

// 📏 Distance Function
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// 🔥 Levenshtein Distance (typo handling)
const levenshtein = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          1 +
          Math.min(
            matrix[i - 1][j],     // deletion
            matrix[i][j - 1],     // insertion
            matrix[i - 1][j - 1]  // substitution
          );
      }
    }
  }

  return matrix[b.length][a.length];
};

export const searchMedicine = async (req, res) => {
  try {
    const { medicine, lat, lng } = req.body;

    if (!medicine || !lat || !lng) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const searchTerm = medicine.toLowerCase();

    // 🔥 Get all medicines (broad search)
    const allMedicines = await Medicine.find({
      stock: { $gt: 0 }
    }).populate("store");

    // 🔥 Smart filter (typo + partial match)
    const filtered = allMedicines.filter(item => {
      const name = item.name.toLowerCase();

      // direct match
      if (name.includes(searchTerm)) return true;

      // word-level match
      if (searchTerm.includes(name)) return true;

      // typo match (distance <= 3)
      const distance = levenshtein(name, searchTerm);
      return distance <= 3;
    });

    // fallback (agar kuch nahi mila)
    const finalMedicines = filtered.length ? filtered : allMedicines;

    // 📍 Distance mapping
    const result = finalMedicines.map(item => {
      const store = item.store;

      const distance = getDistance(
        lat,
        lng,
        store.location.coordinates[1],
        store.location.coordinates[0]
      );

      return {
        storeName: store.name,
        address: store.address,
        medicine: item.name,
        price: item.price,
        stock: item.stock,
        distance: Number(distance.toFixed(2)),
        location: store.location
      };
    });

    // 🔥 Nearby filter + fallback
    let nearby = result.filter(item => item.distance <= 5);

    if (nearby.length === 0) {
      nearby = result;
    }

    // 🔥 Sort nearest first
    nearby.sort((a, b) => a.distance - b.distance);

    res.json(nearby);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};