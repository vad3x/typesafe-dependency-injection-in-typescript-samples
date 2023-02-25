import { decorate, injectable, inject } from "inversify";

import {
  FindProductById,
  FindUserByUsername,
  FindUserReviews,
  ImplFindUserReviewedProducts,
} from "@part6-common/app";

decorate(injectable(), ImplFindUserReviewedProducts);

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
