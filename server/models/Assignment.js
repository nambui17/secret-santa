// Group of friends penguin pack
const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = new Schema(
  {
    packId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pack',
      },
      giver: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
  },
  {
    toJSON: {
        virtuals: true,
    },
    timestamps: true,
  }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;