import {
  GetDynamodbClient,
  DynamodbUserReviewStore,
} from "@part6-common/app.spi.dynamodb";

export class DecoratedDynamodbUserReviewStore extends DynamodbUserReviewStore {
  public static inject = ["GetDynamodbClient"] as const;

  constructor(getDynamodbClient: GetDynamodbClient) {
    super(getDynamodbClient);
  }
}
