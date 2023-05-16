import Category from "../mongodb/models/category.js";
import Post from "../mongodb/models/post.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCategory = async (req, res) => {
  try {
    const { title, allPosts } = req.body;

    const category = new Category({
      title,
      allPosts,
    });

    await category.save();

    res.status(201).json({ message: "Category saved successfully", category });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategoryDetail = async (req, res) => {
  try {
    const category = null;
    const searchBy = req.query.searchBy;
    const value = req.query.value;

    switch (searchBy) {
      case "name":
        category = await Category.find({
          title: { $regex: value, $options: "i" },
        });
        break;
      case "_id":
        category = await Category.findById(value);
        break;
      default:
        category = await Category.find({});
        break;
    }
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, allPosts } = req.body;

    const category = await Category.findById(id);

    const categoryToUpdate = await Category.update(
      { _id: id },
      {
        $set: {
          name,
          allPosts,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Category  updated successfully",
      categoryToUpdate,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    await Post.deleteMany({ idCategory: category._id });

    await category.delete();
    res.status(200).json("Category has been deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};


export {
    getAllCategories,
    createCategory,
    getCategoryDetail,
    updateCategory,
    deleteCategory,

}