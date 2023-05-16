
import mongoose from "mongoose";

// create user Schema & model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {timestamps: true});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
