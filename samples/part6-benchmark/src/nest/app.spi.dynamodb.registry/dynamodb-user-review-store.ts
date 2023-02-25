import { Injectable, Inject } from "@nestjs/common";

import {
  GetDynamodbClient,
  DynamodbUserReviewStore,
} from "@part6-common/app.spi.dynamodb";

@Injectable()
export class DecoratedDynamodbUserReviewStore extends DynamodbUserReviewStore {
  constructor(
    @Inject("GetDynamodbClient") getDynamodbClient: GetDynamodbClient
  ) {
    super(getDynamodbClient);
  }
}
