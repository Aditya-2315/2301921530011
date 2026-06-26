import axios from "axios"

const LOG_URL = process.env.LOG_API;;

export async function Log(stack, level, pkg, message) {
  try {
    const { data } = await axios.post(
      LOG_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (err) {
    console.error(
      "Logging Error:",
      err.response?.data || err.message
    );
  }
}
