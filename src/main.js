import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
// import { redis } from "./application/redis.js";

async function start() {
  try {
    // await redis.connect();
    web.listen(3000, () => {
      logger.info("app start");
    });
  } catch (error) {
    logger.error("Redis connection failed", error);
    web.listen(3000, () => {
      logger.info("app start without redis");
    });
  }
}

start();
