import { decorate, injectable, inject } from "inversify";

import { ImplFindUserByUsername, UserStore } from "@part6-common/app";

decorate(injectable(), ImplFindUserByUsername);

@injectable()
export class DecoratedImplFindUserByUsername extends ImplFindUserByUsername {
  constructor(@inject("UserStore") userStore: UserStore) {
    super(userStore);
  }
}
