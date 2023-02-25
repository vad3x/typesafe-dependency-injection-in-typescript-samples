import {
  FindProductById,
  FindUserByUsername,
  FindUserReviewedProducts,
  FindUserReviews,
} from "../api";
import { Product } from "../model";

export class ImplFindUserReviewedProducts {
  constructor(
    private readonly findUserByUsername: FindUserByUsername,
    private readonly findUserReviews: FindUserReviews,
    private readonly findProductById: FindProductById
  ) {}

  findUserReviewedProducts: FindUserReviewedProducts = async (username) => {
    const user = await this.findUserByUsername(username);
    if (!user) {
      return undefined;
    }

    const reviews = await this.findUserReviews(user);

    const products = await Promise.all(
      reviews.map((review) => this.findProductById(review.productId))
    );

    return products.filter((x): x is Product => !!x);
  };
}
