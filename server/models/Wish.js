const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    packId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Pack",
    },
    images: [
      {
        type: Schema.ObjectId,
        ref: 'Image'
      },
    ],
    links: [
      {
        type: String,
      },
    ],
    comments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;