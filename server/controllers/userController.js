import { User } from "../models/index.js";
import bcrypt from 'bcrypt';

async function createUser({body}, res) {
  try {
    const userData = await User.create(body);
    if (!userData) {
      throw new Error("Unable to create user");
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUserById(req, res) {
  try {
    const userData = await User.findOne({ _id: req.params._id });
    if (!userData) {
        throw new Error("No user with that ID found");
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const userData = await User.findOneAndDelete({
      _id: req.params._id,
    });
    if (!userData) {
      throw new Error("No user with that ID found")
    }
    res.status(200).json("User successfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function updateUser(req, res) {
  /**
   * Updates user info
   */
  try {
    let body = req.body
    if (body.password) {
      const saltRounds = 10
      body.password = await bcrypt.hash(body.password, saltRounds)
    }
    const userData = await User.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: body
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!userData) {
      throw new Error("Could not update user")
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAllUsers(req,res) {
  try {
    const userData = await User.find()
    .select("_id firstName lastName email wishes packs assignments")
    if (!userData) {
      throw new Error("Could not fetch user data")
    }
    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json(err)
  }
}

export {
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers
};
