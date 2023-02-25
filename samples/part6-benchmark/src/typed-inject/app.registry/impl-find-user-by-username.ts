import { ImplFindUserByUsername, UserStore } from "@part6-common/app";

export class DecoratedImplFindUserByUsername extends ImplFindUserByUsername {
  public static inject = ["UserStore"] as const;

  constructor(userStore: UserStore) {
    super(userStore);
  }
}
