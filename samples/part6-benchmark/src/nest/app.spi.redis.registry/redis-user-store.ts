import { Injectable, Inject } from "@nestjs/common";

import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

@Injectable()
export class DecoratedRedisUserStore extends RedisUserStore {
  constructor(@Inject("GetRedisClient") getRedisClient: GetRedisClient) {
    super(getRedisClient);
  }
}
