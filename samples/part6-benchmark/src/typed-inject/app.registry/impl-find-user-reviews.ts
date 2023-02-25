import { ImplFindUserReviews, UserReviewStore } from "@part6-common/app";

export class DecoratedImplFindUserReviews extends ImplFindUserReviews {
  public static inject = ["UserReviewStore"] as const;

  constructor(userReviewStore: UserReviewStore) {
    super(userReviewStore);
  }
}
