import { ImplFindUserByUsername, UserStore } from "@part6-common/app";

export function implFindUserByUsername() {
  return (deps: { userStore: UserStore }) => {
    const { findUserByUsername } = new ImplFindUserByUsername(deps.userStore);

    return {
      findUserByUsername,
    };
  };
}
