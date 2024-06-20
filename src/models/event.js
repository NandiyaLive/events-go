import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Personnel" }],
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
