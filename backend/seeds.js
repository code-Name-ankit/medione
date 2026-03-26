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
    location: { type: "Point", coordinates: [72.7800, 21.1950] }
  },
  {
    name: "Shree Gayatri Medical",
    address: "Punagam, Varachha, Surat",
    location: { type: "Point", coordinates: [72.8837, 21.2023] }
  },
  {
    name: "Wellness Pharmacy",
    address: "City Light, Surat",
    location: { type: "Point", coordinates: [72.7930, 21.1800] }
  },
  {
    name: "Care Pharmacy",
    address: "Katargam, Surat",
    location: { type: "Point", coordinates: [72.8300, 21.2300] }
  },
  {
    name: "MedPlus Vesu",
    address: "Vesu, Surat",
    location: { type: "Point", coordinates: [72.8060, 21.1700] }
  },
  {
    name: "LifeCare Medical",
    address: "Udhna, Surat",
    location: { type: "Point", coordinates: [72.8560, 21.1460] }
  },
  {
    name: "HealthPlus Pharmacy",
    address: "Athwa, Surat",
    location: { type: "Point", coordinates: [72.7890, 21.1780] }
  },
  {
    name: "New India Medical",
    address: "Varachha Road, Surat",
    location: { type: "Point", coordinates: [72.8700, 21.2100] }
  },
  {
    name: "CityCare Pharmacy",
    address: "Ring Road, Surat",
    location: { type: "Point", coordinates: [72.8310, 21.1950] }
  },
  {
    name: "Om Medical Store",
    address: "Katargam, Surat",
    location: { type: "Point", coordinates: [72.8250, 21.2250] }
  }
]);

    console.log("Stores added");

    // Create Medicines
  const medicines = await Medicine.insertMany([
  // Paracetamol everywhere
  { name: "Paracetamol", price: 50, stock: 20, store: stores[0]._id },
  { name: "Paracetamol", price: 45, stock: 15, store: stores[1]._id },
  { name: "Paracetamol", price: 48, stock: 25, store: stores[2]._id },
  { name: "Paracetamol", price: 52, stock: 18, store: stores[3]._id },

  // Dolo
  { name: "Dolo 650", price: 60, stock: 30, store: stores[4]._id },
  { name: "Dolo 650", price: 55, stock: 20, store: stores[5]._id },

  // Crocin
  { name: "Crocin", price: 40, stock: 25, store: stores[6]._id },
  { name: "Crocin", price: 42, stock: 15, store: stores[7]._id },

  // Antibiotics
  { name: "Azithromycin", price: 120, stock: 10, store: stores[8]._id },
  { name: "Amoxicillin", price: 90, stock: 12, store: stores[9]._id },

  // Cold & cough
  { name: "Benadryl", price: 80, stock: 20, store: stores[0]._id },
  { name: "Corex", price: 95, stock: 18, store: stores[1]._id },

  // Pain relief
  { name: "Brufen", price: 70, stock: 22, store: stores[2]._id },
  { name: "Ibuprofen", price: 65, stock: 30, store: stores[3]._id },

  // Vitamins
  { name: "Vitamin C", price: 120, stock: 40, store: stores[4]._id },
  { name: "Zinc Tablets", price: 110, stock: 35, store: stores[5]._id }
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