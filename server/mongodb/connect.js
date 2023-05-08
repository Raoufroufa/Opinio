import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() =>
      console.log("Connection to MongoDB has been made, now make fireworks...")
    )
    .catch((err) => console.log("Connection error:", err));
};

export default connectDB;
