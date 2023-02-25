import {
  GetDynamodbClient,
  DynamodbUserReviewStore,
} from "@part6-common/app.spi.dynamodb";

export function dynamodbUserReviewStore() {
  return (deps: { getDynamodbClient: GetDynamodbClient }) => {
    const userReviewStore = new DynamodbUserReviewStore(deps.getDynamodbClient);

    return {
      userReviewStore,
    };
  };
}
