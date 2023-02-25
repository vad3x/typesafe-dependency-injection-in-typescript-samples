import { decorate, injectable, inject } from "inversify";

import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

decorate(injectable(), RedisUserStore);

@injectable()
export class DecoratedRedisUserStore extends RedisUserStore {
  constructor(@inject("GetRedisClient") getRedisClient: GetRedisClient) {
    super(getRedisClient);
  }
}
