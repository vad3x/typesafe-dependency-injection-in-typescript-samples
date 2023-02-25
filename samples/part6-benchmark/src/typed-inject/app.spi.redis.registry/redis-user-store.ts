import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

export class DecoratedRedisUserStore extends RedisUserStore {
  public static inject = ["GetRedisClient"] as const;

  constructor(getRedisClient: GetRedisClient) {
    super(getRedisClient);
  }
}
