import { Product } from "../model";

export type FindUserReviewedProducts = (
  username: string
) => Promise<readonly Product[] | undefined>;
