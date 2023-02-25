import { Review, User } from "../model";

export type FindUserReviews = (user: User) => Promise<readonly Review[]>;
