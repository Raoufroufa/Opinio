import express from 'express';

import {getAllUsers, getUserInfoById } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserInfoById);

export default router;