import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./mongodb/connect.js";

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import authenRouter from "./routes/authen.routes.js"
import authenMiddlewhare from "./middlewhares/authen.middlewhare.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// register authentification routes
app.use('/auth', authenRouter)

// initiallize routes
app.use("/api/v1/users", authenMiddlewhare, userRouter);
app.use("/api/v1/posts", authenMiddlewhare, postRouter);

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
