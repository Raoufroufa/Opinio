import express from 'express';

import {getAllUsers, getUserInfoById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserInfoById);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

export default router;