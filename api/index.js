import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRouote from "./routes/Comment.route.js";
import BlogLikeRoute from "./routes/Bloglike.route.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "https://mern-blog-app-gen-9ub5mv1f5-upanish522s-projects.vercel.app",
  "https://mern-blog-app-gen-mbdu8onh6-upanish522s-projects.vercel.app",
  "https://mern-blog-app-gen-ai.vercel.app",
  "http://localhost:5173",

];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (like Postman) that have no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// route setup

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRouote);
app.use("/api/blog-like", BlogLikeRoute);

mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "yt-mern-blog" })
  .then(() => console.log("Database connected."))
  .catch((err) => console.log("Database connection failed.", err));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
