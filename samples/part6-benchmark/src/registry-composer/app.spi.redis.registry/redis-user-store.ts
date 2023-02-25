import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

export function redisUserStore() {
  return (deps: { getRedisClient: GetRedisClient }) => {
    const userStore = new RedisUserStore(deps.getRedisClient);

    return {
      userStore,
    };
  };
}
