import { FindUserReviews } from "../api";

import { UserReviewStore } from "../spi";

export class ImplFindUserReviews {
  constructor(private readonly store: UserReviewStore) {}

  findUserReviews: FindUserReviews = (user) => {
    return this.store.findReviewsByUserId(user.id);
  };
}
