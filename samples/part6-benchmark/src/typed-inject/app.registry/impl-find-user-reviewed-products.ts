import {
  FindProductById,
  FindUserByUsername,
  FindUserReviews,
  ImplFindUserReviewedProducts,
} from "@part6-common/app";

export class DecoratedImplFindUserReviewedProducts extends ImplFindUserReviewedProducts {
  public static inject = [
    "FindUserByUsername",
    "FindUserReviews",
    "FindProductById",
  ] as const;

  constructor(
    findUserByUsername: FindUserByUsername,
    findUserReviews: FindUserReviews,
    findProductById: FindProductById
  ) {
    super(findUserByUsername, findUserReviews, findProductById);
  }
}
