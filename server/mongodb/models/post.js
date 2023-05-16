import mongoose from "mongoose";

// create post Schema & model
const PostSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  photo: [
    {
      type: String,
      required: false,
    },
  ],
  idCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, 
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }, 
}, {timestamps: true});

const postModel = mongoose.model("Post", PostSchema);

export default postModel;
