import Post from "../mongodb/models/post.js";

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
    const { title, description, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const post = new Post({
      title,
      description,
      photo: photoUrl.url || photo,
    });

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
        post = await Post.find({ title: { $regex: value, $options: "i" } });
        break;
      case "description":
        post = await Post.find({
          description: { $regex: value, $options: "i" },
        });
        break;
      case "_id":
        post = await Post.findById(value);
        break;
      default:
        post = await Post.find({});
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
    const { title, description, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const postToUpdate = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        photo: photoUrl.url || photo,
      },
      { new: true }
    );

    if (!postToUpdate) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postToDelete = await Post.findByIdAndDelete(id);
    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getAllPosts, createPost, getPostDetail, updatePost, deletePost };
