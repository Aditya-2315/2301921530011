import {
  fetchNotifications,
  fetchPriorityNotifications,
} from "../services/notification.service.js";

import { Log } from "../../logging-middleware/logger.js";

export const getNotifications = async (req, res) => {

  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Fetching notifications"
    );

    const notifications = await fetchNotifications();

    await Log(
      "backend",
      "info",
      "controller",
      `Fetched ${notifications.length} notifications`
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });

  } catch (err) {

    await Log(
      "backend",
      "error",
      "controller",
      err.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch notifications",
    });

  }
};

export const getPriorityNotifications = async (req, res) => {

  try {

    const limit = Number(req.query.limit) || 10;

    await Log(
      "backend",
      "info",
      "controller",
      `Fetching top ${limit} priority notifications`
    );

    const notifications = await fetchPriorityNotifications(limit);

    await Log(
      "backend",
      "info",
      "controller",
      `Returned ${notifications.length} priority notifications`
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });

  } catch (err) {

    await Log(
      "backend",
      "error",
      "controller",
      err.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch priority notifications",
    });

  }
};