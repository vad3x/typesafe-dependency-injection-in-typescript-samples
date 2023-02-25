import { decorate, injectable, inject } from "inversify";

import { ImplFindUserReviews, UserReviewStore } from "@part6-common/app";

decorate(injectable(), ImplFindUserReviews);

@injectable()
export class DecoratedImplFindUserReviews extends ImplFindUserReviews {
  constructor(@inject("UserReviewStore") userReviewStore: UserReviewStore) {
    super(userReviewStore);
  }
}
