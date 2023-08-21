// Group of friends penguin pack
import mongoose from 'mongoose';
const { Schema } = mongoose;

const assignmentSchema = new Schema(
  {
    packId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Pack',
    },
    gifter: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      unique: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
