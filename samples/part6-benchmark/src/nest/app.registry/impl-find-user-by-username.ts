import { Injectable, Inject } from "@nestjs/common";

import { ImplFindUserByUsername, UserStore } from "@part6-common/app";

@Injectable()
export class DecoratedImplFindUserByUsername extends ImplFindUserByUsername {
  constructor(@Inject("UserStore") userStore: UserStore) {
    super(userStore);
  }
}
