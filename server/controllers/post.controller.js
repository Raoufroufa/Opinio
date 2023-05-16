import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";
import Category from "../mongodb/models/category.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, photo, idCategory, email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const category = await Category.findOne({ _id: idCategory });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const photoUrl = await cloudinary.uploader.upload(photo);

    const post = new Post({
      title,
      description,
      photo: photoUrl.url || photo,
      idCreator: user._id,
      idCategory: category._id,
    });

    category.allPosts.push(post._id);

    await post.save();

    res.status(201).json({ message: "Post saved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostDetail = async (req, res) => {
  try {
    const post = null;
    const searchBy = req.query.searchBy;
    const value = req.query.value;

    switch (searchBy) {
      case "title":
        post = await Post.find({
          title: { $regex: value, $options: "i" },
        }).populate(post.idCategory);
        break;
      case "_id":
        post = await Post.findById(value).populate(post.idCategory);
        break;
      case "idCategory":
        post = await Post.find(value).populate(post.idCategory);
        break;
      default:
        post = await Post.find({}).populate(post.idCategory);
        break;
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, photo, idCategory } = req.body;

    const post = await Post.findById(id);

    if (post.idCreator === req.body.idCreator) {
      try {
        const photoUrl = await cloudinary.uploader.upload(photo);

        const postToUpdate = await Post.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              title,
              description,
              photo: photoUrl.url || photo,
              idCategory,
            },
          },
          { new: true }
        );
        res.status(200).json({
          message: "Post updated successfully",
          postToUpdate,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post.idCreator === req.body.idCreator) {
      try {
        await Post.delete();
        res.status(200).json("Post has been deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getAllPosts, createPost, getPostDetail, updatePost, deletePost };
