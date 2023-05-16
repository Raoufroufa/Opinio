import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./mongodb/connect.js";

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/users.routes.js";
import postRouter from "./routes/posts.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import authenRouter from "./routes/authen.routes.js";
import authenMiddlewhare from "./middlewhares/authen.middlewhare.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/images" )));


const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, "images");
  }, filename: (req, file, cb) => {
    cb(null, req.body.name)
   },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single("file"), (req, res) => { 
  res.status(200).json("File has been uploaded successfully")
});


// register authentification routes
app.use("/api/auth", authenRouter);

// initiallize routes
app.use("/api/users", authenMiddlewhare, userRouter);
app.use("/api/posts", authenMiddlewhare, postRouter);
app.use("/api/categories", authenMiddlewhare, categoryRouter);


// start mongodb server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(5000, () =>
      console.log("Server started on port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
