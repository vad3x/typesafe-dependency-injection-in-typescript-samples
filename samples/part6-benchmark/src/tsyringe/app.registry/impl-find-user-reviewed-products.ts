import { injectable, inject } from "tsyringe";

import {
  FindProductById,
  FindUserByUsername,
  FindUserReviews,
  ImplFindUserReviewedProducts,
} from "@part6-common/app";

@injectable()
export class DecoratedImplFindUserReviewedProducts extends ImplFindUserReviewedProducts {
  constructor(
    @inject("FindUserByUsername") findUserByUsername: FindUserByUsername,
    @inject("FindUserReviews") findUserReviews: FindUserReviews,
    @inject("FindProductById") findProductById: FindProductById
  ) {
    super(findUserByUsername, findUserReviews, findProductById);
  }
}
