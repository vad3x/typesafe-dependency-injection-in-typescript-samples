import {
  container as ct,
  DependencyContainer,
  instancePerContainerCachingFactory,
} from "tsyringe";

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
  const container: DependencyContainer = ct;

  container.register("GetMysqlClient", {
    useValue: () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    },
  });

  container.register("GetRedisClient", {
    useValue: () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    },
  });

  container.register("GetDynamodbClient", {
    useValue: () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    },
  });

  container.register("ProductStore", {
    useClass: DecoratedMysqlProductStore,
  });

  container.register("UserReviewStore", {
    useClass: DecoratedDynamodbUserReviewStore,
  });

  container.register("UserStore", {
    useClass: DecoratedRedisUserStore,
  });

  bindFunction(
    container,
    DecoratedImplFindProductById,
    "FindProductById",
    "findProductById"
  );

  bindFunction(
    container,
    DecoratedImplFindUserByUsername,
    "FindUserByUsername",
    "findUserByUsername"
  );

  bindFunction(
    container,
    DecoratedImplFindUserReviews,
    "FindUserReviews",
    "findUserReviews"
  );

  bindFunction(
    container,
    DecoratedImplFindUserReviewedProducts,
    "FindUserReviewedProducts",
    "findUserReviewedProducts"
  );

  return container;
}

export function createFrozenContainer() {
  const container = createContainer();

  return Object.freeze({
    getMysqlClient: container.resolve("GetMysqlClient"),
    getRedisClient: container.resolve("GetRedisClient"),
    getDynamodbClient: container.resolve("GetDynamodbClient"),
    findProductById: container.resolve("FindProductById"),
    productStore: container.resolve("ProductStore"),
    userStore: container.resolve("UserStore"),
    userReviewStore: container.resolve("UserReviewStore"),
    findUserByUsername: container.resolve("FindUserByUsername"),
    findUserReviews: container.resolve("FindUserReviews"),
    findUserReviewedProducts: container.resolve("FindUserReviewedProducts"),
  });
}

function bindFunction(
  container: DependencyContainer,
  ctor: any,
  functionName: string,
  fieldName: string
) {
  const serviceId = Symbol();
  container.register(serviceId, {
    useClass: ctor,
  });

  container.register(functionName, {
    useFactory: instancePerContainerCachingFactory(
      (sp: DependencyContainer) => sp.resolve<any>(serviceId)[fieldName]
    ),
  });
}
