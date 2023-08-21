import mongoose from 'mongoose'
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    fileId: {
        type: String,
    },
    wishId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Wish"
    }
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;