import { User, UserStore } from "../../app";
import { GetRedisClient } from "../spi";

export class RedisUserStore implements UserStore {
  constructor(private readonly getClient: GetRedisClient) {}

  // NOTE: stub implementation
  findByUsername(username: string): Promise<User | undefined> {
    const client = this.getClient();

    return client.exec({
      username,
    });
  }
}
