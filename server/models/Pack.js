// Group of friends penguin pack
const mongoose = require("mongoose");
const { Schema } = mongoose;

const packSchema = new Schema(
  {
    packName: {
        type: String,
        trim: true,
        required: true,
    },
    members: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ],
    admin: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    assignments: [
        {
            type: Schema.ObjectId,
            ref: 'Assignment'
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;