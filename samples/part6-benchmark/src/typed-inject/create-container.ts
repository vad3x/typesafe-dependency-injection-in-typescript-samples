import {
  createInjector,
  InjectableFunctionWithInject,
  InjectionToken,
} from "typed-inject";

import {
  DecoratedImplFindProductById,
  DecoratedImplFindUserByUsername,
  DecoratedImplFindUserReviewedProducts,
  DecoratedImplFindUserReviews,
} from "./app.registry";

import { DecoratedDynamodbUserReviewStore } from "./app.spi.dynamodb.registry";
import { DecoratedMysqlProductStore } from "./app.spi.mysql.registry";
import { DecoratedRedisUserStore } from "./app.spi.redis.registry";

export function createContainer() {
  const container = createInjector()
    .provideValue("GetMysqlClient", () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    })
    .provideValue("GetRedisClient", () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    })
    .provideValue("GetDynamodbClient", () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    })
    .provideClass("ProductStore", DecoratedMysqlProductStore)
    .provideClass("UserReviewStore", DecoratedDynamodbUserReviewStore)
    .provideClass("UserStore", DecoratedRedisUserStore)
    .provideClass("DecoratedImplFindProductById", DecoratedImplFindProductById)
    .provideFactory(
      "FindProductById",
      provideFn(["DecoratedImplFindProductById"], "findProductById")
    )
    .provideClass(
      "DecoratedImplFindUserByUsername",
      DecoratedImplFindUserByUsername
    )
    .provideFactory(
      "FindUserByUsername",
      provideFn(["DecoratedImplFindUserByUsername"], "findUserByUsername")
    )
    .provideClass("DecoratedImplFindUserReviews", DecoratedImplFindUserReviews)
    .provideFactory(
      "FindUserReviews",
      provideFn(["DecoratedImplFindUserReviews"], "findUserReviews")
    )
    .provideClass(
      "DecoratedImplFindUserReviewedProducts",
      DecoratedImplFindUserReviewedProducts as any
    )
    .provideFactory(
      "FindUserReviewedProducts",
      provideFn(
        ["DecoratedImplFindUserReviewedProducts"],
        "findUserReviewedProducts"
      )
    );

  return container;
}

function provideFn<
  R,
  TContext,
  Tokens extends readonly InjectionToken<TContext>[]
>(
  deps: Tokens,
  fieldName: string
): InjectableFunctionWithInject<TContext, R, Tokens> {
  function resolveFunction(service: any) {
    return service[fieldName];
  }
  resolveFunction.inject = deps;

  return resolveFunction as any;
}
