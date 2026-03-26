import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

// Geo Index for location field
storeSchema.index({ location: "2dsphere" });

export default mongoose.model("Store", storeSchema);