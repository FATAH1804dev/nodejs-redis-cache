import { prisma } from "../application/database.js";
import { redis } from "../application/redis.js";

const getAll = async () => {
  // console.info("check getAll");
  try {
    // console.info("check1");
    const dataRedis = await redis.get("categories");
    console.info(`redis: ${JSON.parse(dataRedis)}`);
    if (dataRedis) {
      return JSON.parse(dataRedis);
    }
  } catch (err) {
    console.warn("Redis read failed:", err.message);
  }

  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      children: true,
    },
  });

  try {
    // console.info("check3");
    await redis.setex("categories", 3600, JSON.stringify(categories));
  } catch (err) {
    console.warn("Redis write failed:", err.message);
  }
  // console.info(`mysql db: ${categories}`);
  return categories;
};

export default {
  getAll,
};
