import { User } from "../model";

export interface UserStore {
  findByUsername(username: string): Promise<User | undefined>;
}
