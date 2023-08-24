import mongoose from 'mongoose';
const { Schema } = mongoose;

const wishSchema = new Schema(
  {
    wishName: {
      type: String,
      required: true
    },
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

export default Wish;