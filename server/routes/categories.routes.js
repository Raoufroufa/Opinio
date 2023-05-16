import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryDetail,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/:id").get(getCategoryDetail);
router.route("/").post(createCategory);
router.route("/:id").patch(updateCategory);
router.route("/:id").delete(deleteCategory);

export default router;
