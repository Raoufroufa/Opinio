import express from 'express';
import { registeration, logging } from "../controllers/authen.controller.js";

import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register routes
router.post("/register", registeration);


// Login routes
router.post("/login", logging);

export default router;