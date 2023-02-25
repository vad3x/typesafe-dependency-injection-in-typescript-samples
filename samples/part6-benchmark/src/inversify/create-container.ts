import { Container } from "inversify";

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
  const container = new Container({
    defaultScope: "Singleton",
  });

  container.bind("GetMysqlClient").toFunction(() => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  });

  container.bind("GetRedisClient").toFunction(() => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  });

  container.bind("GetDynamodbClient").toFunction(() => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  });

  container.bind("ProductStore").to(DecoratedMysqlProductStore);
  container.bind("UserReviewStore").to(DecoratedDynamodbUserReviewStore);
  container.bind("UserStore").to(DecoratedRedisUserStore);

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
    getMysqlClient: container.get("GetMysqlClient"),
    getRedisClient: container.get("GetRedisClient"),
    getDynamodbClient: container.get("GetDynamodbClient"),
    findProductById: container.get("FindProductById"),
    productStore: container.get("ProductStore"),
    userStore: container.get("UserStore"),
    userReviewStore: container.get("UserReviewStore"),
    findUserByUsername: container.get("FindUserByUsername"),
    findUserReviews: container.get("FindUserReviews"),
    findUserReviewedProducts: container.get("FindUserReviewedProducts"),
  });
}

function bindFunction(
  container: Container,
  ctor: any,
  functionName: string,
  fieldName: string
) {
  const serviceId = Symbol();
  container.bind(serviceId).to(ctor);

  container
    .bind(functionName)
    .toDynamicValue(
      ({ container }) => container.get<any>(serviceId)[fieldName]
    );
}
