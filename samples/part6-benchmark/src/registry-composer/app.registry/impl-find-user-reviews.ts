import { ImplFindUserReviews, UserReviewStore } from "@part6-common/app";

export function implFindUserReviews() {
  return (deps: { userReviewStore: UserReviewStore }) => {
    const { findUserReviews } = new ImplFindUserReviews(deps.userReviewStore);

    return {
      findUserReviews,
    };
  };
}
