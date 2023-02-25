import { FindUserByUsername } from "../api";

import { UserStore } from "../spi";

export class ImplFindUserByUsername {
  constructor(private readonly store: UserStore) {}

  findUserByUsername: FindUserByUsername = (username) => {
    return this.store.findByUsername(username);
  };
}
