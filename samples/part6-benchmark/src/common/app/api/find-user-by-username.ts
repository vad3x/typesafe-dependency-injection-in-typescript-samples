import { User } from "../model";

export type FindUserByUsername = (
  username: string
) => Promise<User | undefined>;
