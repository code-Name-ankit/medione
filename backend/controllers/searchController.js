import Store from "../models/Store.js";
import Medicine from "../models/Medicine.js";



const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const searchMedicine = async (req, res) => {
  try {
    const { medicine, lat, lng } = req.body;

    const medicines = await Medicine.find({
      name: new RegExp(medicine, "i"),
      stock: { $gt: 0 }
    }).populate("store");

    const result = medicines.map(item => {
      const store = item.store;

      const distance = getDistance(
        lat,
        lng,
        store.location.coordinates[1], // lat
        store.location.coordinates[0]  // lng
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

    // 5 km filter
    const nearby = result.filter(item => item.distance <= 5);

    // sort nearest first
    nearby.sort((a, b) => a.distance - b.distance);

    res.json(nearby);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};