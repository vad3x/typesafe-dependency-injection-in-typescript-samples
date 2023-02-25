import { ID, Review, UserReviewStore } from "../../app";
import { GetDynamodbClient } from "../spi";

export class DynamodbUserReviewStore implements UserReviewStore {
  constructor(private readonly getClient: GetDynamodbClient) {}

  // NOTE: stub implementation
  findReviewsByUserId(userId: ID): Promise<readonly Review[]> {
    const client = this.getClient();

    return client.exec({
      userId,
    });
  }
}
