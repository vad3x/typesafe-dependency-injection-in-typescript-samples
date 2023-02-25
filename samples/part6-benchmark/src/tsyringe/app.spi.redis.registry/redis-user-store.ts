import { injectable, inject } from "tsyringe";

import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

@injectable()
export class DecoratedRedisUserStore extends RedisUserStore {
  constructor(@inject("GetRedisClient") getRedisClient: GetRedisClient) {
    super(getRedisClient);
  }
}
