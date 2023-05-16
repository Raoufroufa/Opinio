import mongoose from "mongoose";

// create category Schema & model
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  allPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const categoryModel = mongoose.model("Category", CategorySchema);

export default categoryModel;
