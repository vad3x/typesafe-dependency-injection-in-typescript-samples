import { GetRedisClient } from "@part6-common/app.spi.redis";

export function implGetRedisClient() {
  return () => {
    const getRedisClient: GetRedisClient = () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    };

    return {
      getRedisClient,
    };
  };
}
