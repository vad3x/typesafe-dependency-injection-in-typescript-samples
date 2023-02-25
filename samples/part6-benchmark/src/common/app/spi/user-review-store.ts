import { ID, Review } from "../model";

export interface UserReviewStore {
  findReviewsByUserId(userId: ID): Promise<readonly Review[]>;
}
