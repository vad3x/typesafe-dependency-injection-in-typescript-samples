import { injectable, inject } from "tsyringe";

import { ImplFindUserByUsername, UserStore } from "@part6-common/app";

@injectable()
export class DecoratedImplFindUserByUsername extends ImplFindUserByUsername {
  constructor(@inject("UserStore") userStore: UserStore) {
    super(userStore);
  }
}
