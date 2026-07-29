import app from "./app";
import { env } from "./config/env";

const PORT = env.port;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("");
      console.log("=================================");
      console.log(`🚀 FixItNow Server Running`);
      console.log(`🌍 http://localhost:${PORT}`);
      console.log("=================================");
      console.log("");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();