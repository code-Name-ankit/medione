import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  }
});

export default mongoose.model("Medicine", medicineSchema);