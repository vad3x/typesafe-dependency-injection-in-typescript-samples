import { injectable, inject } from "tsyringe";

import { ImplFindUserReviews, UserReviewStore } from "@part6-common/app";

@injectable()
export class DecoratedImplFindUserReviews extends ImplFindUserReviews {
  constructor(@inject("UserReviewStore") userReviewStore: UserReviewStore) {
    super(userReviewStore);
  }
}
