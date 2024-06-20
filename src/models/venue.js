const { Schema, model } = require("mongoose");

const venueSchema = new Schema({
  venueName: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const Venue = model("Venue", venueSchema);

export default Venue;
