import { Injectable, Inject } from "@nestjs/common";

import {
  FindProductById,
  FindUserByUsername,
  FindUserReviews,
  ImplFindUserReviewedProducts,
} from "@part6-common/app";

@Injectable()
export class DecoratedImplFindUserReviewedProducts extends ImplFindUserReviewedProducts {
  constructor(
    @Inject("FindUserByUsername") findUserByUsername: FindUserByUsername,
    @Inject("FindUserReviews") findUserReviews: FindUserReviews,
    @Inject("FindProductById") findProductById: FindProductById
  ) {
    super(findUserByUsername, findUserReviews, findProductById);
  }
}
