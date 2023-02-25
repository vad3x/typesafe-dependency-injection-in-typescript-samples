import {
  FindProductById,
  FindUserByUsername,
  FindUserReviews,
  ImplFindUserReviewedProducts,
} from "@part6-common/app";

export function implFindUserReviewedProducts() {
  return (deps: {
    findUserByUsername: FindUserByUsername;
    findUserReviews: FindUserReviews;
    findProductById: FindProductById;
  }) => {
    const { findUserReviewedProducts } = new ImplFindUserReviewedProducts(
      deps.findUserByUsername,
      deps.findUserReviews,
      deps.findProductById
    );

    return {
      findUserReviewedProducts,
    };
  };
}
