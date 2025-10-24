import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
// We deleted the first "const PORT" from here.

const __dirname = path.resolve();

// This is the new, correct CORS setup
const frontendURL = process.env.FRONTEND_URL;
if (!frontendURL) {
  console.error("ERROR: FRONTEND_URL environment variable is not set.");
  // In a real app, you might want to exit if this isn't set
  // process.exit(1); 
}

app.use(
  cors({
    origin: frontendURL || "http://localhost:5173", // Fallback for safety
    credentials: true, // allow frontend to send cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// We removed the entire 'if (process.env.NODE_ENV === "production")' block.
// It is not needed because your frontend is a separate "Static Site" on Render.

// This is the GOOD code, now only declared ONCE.
const PORT = process.env.PORT || 5001; // Uses Render's port, or 5001 for local testing

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Use the variable
  connectDB(); // Moved connectDB here so it runs when the server starts
});
