const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  userId: { type: String, required: true },
  eventDetails: {
    brideName: { type: String, required: true },
    groomName: { type: String, required: true },
    weddingDate: { type: String, required: true },
    weddingTime: { type: String, required: true },
    weddingVenue: { type: String, required: true },
    yourStory: { type: String, required: true },
  },
  guestList: [],
  photoGallery: [],
  mapAndDirections: {
    link: { type: String, required: true },
    directions: { type: String, required: true },
  },
  travelAndAccommodation: {
    travelInfo: { type: String, required: true },
    accommodationsInfo: { type: String, required: true },
  },
  colorManagement: { type: String, required: true },
});

module.exports = mongoose.model("Template", templateSchema);
