import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  equipmentType: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;
