import {
  implFindProductById,
  implFindUserByUsername,
  implFindUserReviewedProducts,
  implFindUserReviews,
} from "./app.registry";

import {
  dynamodbUserReviewStore,
  implGetDynamodbClient,
} from "./app.spi.dynamodb.registry";

import {
  implGetMysqlClient,
  mysqlProductStore,
} from "./app.spi.mysql.registry";

import { implGetRedisClient, redisUserStore } from "./app.spi.redis.registry";

import { RegistryComposer } from "./registry-composer";

export function createAppRegistry() {
  return new RegistryComposer()
    .add(implGetMysqlClient())
    .add(implGetRedisClient())
    .add(implGetDynamodbClient())
    .add(mysqlProductStore())
    .add(redisUserStore())
    .add(dynamodbUserReviewStore())
    .add(implFindProductById())
    .add(implFindUserByUsername())
    .add(implFindUserReviews())
    .add(implFindUserReviewedProducts())
    .compose();
}
