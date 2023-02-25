import { decorate, injectable, inject } from "inversify";

import {
  GetDynamodbClient,
  DynamodbUserReviewStore,
} from "@part6-common/app.spi.dynamodb";

decorate(injectable(), DynamodbUserReviewStore);

@injectable()
export class DecoratedDynamodbUserReviewStore extends DynamodbUserReviewStore {
  constructor(
    @inject("GetDynamodbClient") getDynamodbClient: GetDynamodbClient
  ) {
    super(getDynamodbClient);
  }
}
