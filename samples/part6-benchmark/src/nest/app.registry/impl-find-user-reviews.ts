import { Injectable, Inject } from "@nestjs/common";

import { ImplFindUserReviews, UserReviewStore } from "@part6-common/app";

@Injectable()
export class DecoratedImplFindUserReviews extends ImplFindUserReviews {
  constructor(@Inject("UserReviewStore") userReviewStore: UserReviewStore) {
    super(userReviewStore);
  }
}
