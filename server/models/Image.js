const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    fileId: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;