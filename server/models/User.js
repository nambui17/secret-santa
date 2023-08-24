// User mongodb model
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const { Schema } = mongoose;
const { isEmail } = validator;

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
      immutable: true,
      validate: [isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    wishes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Wish',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend',
      },
    ],
    packs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pack',
      },
    ],
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: false,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
