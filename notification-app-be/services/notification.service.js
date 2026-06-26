import axios from "axios";
import dotenv from "dotenv";

import { Log } from "../../logging-middleware/logger.js";
import { getTopPriorityNotifications } from "../utils/priority.js";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
};

// Fetch all notifications
export async function fetchNotifications() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Fetching notifications from external API"
    );

    const { data } = await axios.get(
      `${BASE_URL}/notifications`,
      axiosConfig
    );

    await Log(
      "backend",
      "info",
      "service",
      "Notifications fetched successfully"
    );

    // Some APIs wrap the array inside data
    return data.data || data;

  } catch (err) {

    await Log(
      "backend",
      "error",
      "service",
      err.response?.data?.message || err.message
    );

    throw err;
  }
}

// Fetch top N priority notifications
export async function fetchPriorityNotifications(limit = 10) {

  try {

    const notifications = await fetchNotifications();

    const prioritized = getTopPriorityNotifications(
      notifications,
      limit
    );

    await Log(
      "backend",
      "info",
      "service",
      `Computed top ${limit} priority notifications`
    );

    return prioritized;

  } catch (err) {

    await Log(
      "backend",
      "error",
      "service",
      err.response?.data?.message || err.message
    );

    throw err;

  }
}