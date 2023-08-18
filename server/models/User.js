// User mongodb model
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    wishes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wish",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Friend",
      },
    ],
    packs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pack",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User
