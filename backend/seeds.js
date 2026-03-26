import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Store from "./models/Store.js";
import Medicine from "./models/Medicine.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("🧹 Deleting old data...");

    // ❌ Delete old data
    await Store.deleteMany();
    await Medicine.deleteMany();

    console.log("✅ Old data deleted");

    // 🏪 Create Stores
    const stores = await Store.insertMany([
      {
        name: "Apollo Pharmacy",
        address: "Ahmedabad",
        location: {
          type: "Point",
          coordinates: [72.5714, 23.0225]
        }
      },
      {
        name: "MedPlus",
        address: "Satellite",
        location: {
          type: "Point",
          coordinates: [72.5300, 23.0300]
        }
      },
      {
        name: "Wellness Pharmacy",
        address: "Navrangpura",
        location: {
          type: "Point",
          coordinates: [72.5600, 23.0400]
        }
      }
    ]);

    console.log("🏪 Stores added");

    // 💊 Create Medicines
    const medicines = await Medicine.insertMany([
      {
        name: "Paracetamol",
        price: 50,
        stock: 20,
        store: stores[0]._id
      },
      {
        name: "Dolo 650",
        price: 60,
        stock: 15,
        store: stores[1]._id
      },
      {
        name: "Crocin",
        price: 40,
        stock: 25,
        store: stores[2]._id
      },
      {
        name: "Paracetamol",
        price: 45,
        stock: 10,
        store: stores[1]._id
      }
    ]);

    console.log("💊 Medicines added");

    console.log("🎉 Seeding completed!");

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedData();