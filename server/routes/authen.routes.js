import express from 'express';
import { registeration, logging } from "../controllers/authen.controller.js";

import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", registeration);

router.post("/logging", logging);

export default router;