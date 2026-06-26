import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notificationRoutes from "./routes/notification.route.js";
import { Log } from "../logging-middleware/logger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// Log every incoming request
app.use(async (req, res, next) => {
  await Log(
    "backend",
    "info",
    "middleware",
    `${req.method} ${req.originalUrl}`
  );

  next();
});

app.use("/api/notifications", notificationRoutes);

// Health Check
app.get("/", async (req, res) => {
  await Log(
    "backend",
    "info",
    "route",
    "Health check endpoint accessed"
  );

  res.json({
    success: true,
    message: "Notification Backend Running"
  });
});

// Global Error Handler
app.use(async (err, req, res, next) => {

  await Log(
    "backend",
    "error",
    "server",
    err.message
  );

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

  await Log(
    "backend",
    "info",
    "server",
    `Server started on port ${PORT}`
  );

  console.log(`Server running on port ${PORT}`);

});