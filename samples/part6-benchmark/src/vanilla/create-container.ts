import {
  ImplFindProductById,
  ImplFindUserByUsername,
  ImplFindUserReviewedProducts,
  ImplFindUserReviews,
} from "@part6-common/app";

import {
  DynamodbUserReviewStore,
  GetDynamodbClient,
} from "@part6-common/app.spi.dynamodb";

import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";
import { GetRedisClient, RedisUserStore } from "@part6-common/app.spi.redis";

export function createContainer() {
  const getMysqlClient: GetMysqlClient = () => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  };

  const getRedisClient: GetRedisClient = () => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  };

  const getDynamodbClient: GetDynamodbClient = () => {
    return {
      exec() {
        throw new Error("Not implemented");
      },
    };
  };

  const productStore = new MysqlProductStore(getMysqlClient);

  const userStore = new RedisUserStore(getRedisClient);

  const userReviewStore = new DynamodbUserReviewStore(getDynamodbClient);

  const { findProductById } = new ImplFindProductById(productStore);

  const { findUserByUsername } = new ImplFindUserByUsername(userStore);

  const { findUserReviews } = new ImplFindUserReviews(userReviewStore);

  const { findUserReviewedProducts } = new ImplFindUserReviewedProducts(
    findUserByUsername,
    findUserReviews,
    findProductById
  );

  return Object.freeze({
    getMysqlClient,
    getRedisClient,
    getDynamodbClient,
    findProductById,
    productStore,
    userStore,
    userReviewStore,
    findUserByUsername,
    findUserReviews,
    findUserReviewedProducts,
  });
}
