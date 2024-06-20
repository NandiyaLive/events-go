import mongoose from "mongoose";

const personnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  availableHours: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
});

const Personnel = mongoose.model("Personnel", personnelSchema);

export default Personnel;
