import { injectable, inject } from "tsyringe";

import {
  GetDynamodbClient,
  DynamodbUserReviewStore,
} from "@part6-common/app.spi.dynamodb";

@injectable()
export class DecoratedDynamodbUserReviewStore extends DynamodbUserReviewStore {
  constructor(
    @inject("GetDynamodbClient") getDynamodbClient: GetDynamodbClient
  ) {
    super(getDynamodbClient);
  }
}
