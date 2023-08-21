// Group of friends penguin pack
import mongoose from 'mongoose'
const { Schema } = mongoose;

const friendSchema = new Schema(
  {
    requester: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        enums: [
            0, // Add friend
            1, // Friendship requested
            2, // pending friend request
            3, // friends
        ]
    }
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;