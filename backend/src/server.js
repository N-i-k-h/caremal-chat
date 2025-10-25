import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// For ESM (__dirname replacement)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "https://caremal-chat-16.onrender.com", // your Render frontend URL
      "http://localhost:5173",               // local dev testing
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve frontend build in production
const clientPath = path.join(__dirname, "client/dist");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ✅ Connect to DB and start server
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
