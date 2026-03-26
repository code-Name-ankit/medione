import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Store from "./models/Store.js";
import Medicine from "./models/Medicine.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("Deleting old data...");

    // Delete old data
    await Store.deleteMany();
    await Medicine.deleteMany();

    console.log("Old data deleted");

    // Create Stores
   const stores = await Store.insertMany([
  {
    name: "Apollo Pharmacy Surat",
    address: "Adajan, Surat",
    location: {
      type: "Point",
      coordinates: [72.7800, 21.1950]
    }
  },
  {
    name: "Shree Gayatri Medical",
    address: " 5, Ajmal Palace Chokdi, Sita Nagar Society, Punagam, Varachha, Surat, Gujarat 395011.",
    location: {
      type: "Point",
      coordinates: [72.8837, 21.2023]
    }
  },
  {
    name: "Wellness Pharmacy Surat",
    address: "City Light, Surat",
    location: {
      type: "Point",
      coordinates: [72.7930, 21.1800]
    }
  },
  {
    name: "Care Pharmacy",
    address: "Katargam, Surat",
    location: {
      type: "Point",
      coordinates: [72.8300, 21.2300]
    }
  }
]);

    console.log("Stores added");

    // Create Medicines
   const medicines = await Medicine.insertMany([
  {
    name: "Paracetamol",
    price: 50,
    stock: 20,
    store: stores[0]._id
  },
  {
    name: "Paracetamol",
    price: 45,
    stock: 15,
    store: stores[1]._id
  },
  {
    name: "Dolo 650",
    price: 60,
    stock: 25,
    store: stores[2]._id
  },
  {
    name: "Crocin",
    price: 40,
    stock: 30,
    store: stores[3]._id
  }
]);

    console.log("Medicines added");

    console.log("Seeding completed!");

    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedData();