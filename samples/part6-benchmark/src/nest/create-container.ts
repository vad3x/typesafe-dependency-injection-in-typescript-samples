import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import {
  DecoratedImplFindProductById,
  DecoratedImplFindUserByUsername,
  DecoratedImplFindUserReviewedProducts,
  DecoratedImplFindUserReviews,
} from "./app.registry";

import { DecoratedDynamodbUserReviewStore } from "./app.spi.dynamodb.registry";
import { DecoratedMysqlProductStore } from "./app.spi.mysql.registry";
import { DecoratedRedisUserStore } from "./app.spi.redis.registry";

@Module({
  providers: [
    DecoratedImplFindProductById,
    DecoratedImplFindUserByUsername,
    DecoratedImplFindUserReviewedProducts,
    DecoratedImplFindUserReviews,
    {
      provide: "FindProductById",
      useFactory: ({ findProductById }: DecoratedImplFindProductById) => {
        return findProductById;
      },
      inject: [DecoratedImplFindProductById],
    },
    {
      provide: "FindUserByUsername",
      useFactory: ({ findUserByUsername }: DecoratedImplFindUserByUsername) => {
        return findUserByUsername;
      },
      inject: [DecoratedImplFindUserByUsername],
    },
    {
      provide: "FindUserReviewedProducts",
      useFactory: ({
        findUserReviewedProducts,
      }: DecoratedImplFindUserReviewedProducts) => {
        return findUserReviewedProducts;
      },
      inject: [DecoratedImplFindUserReviewedProducts],
    },
    {
      provide: "FindUserReviews",
      useFactory: ({ findUserReviews }: DecoratedImplFindUserReviews) => {
        return findUserReviews;
      },
      inject: [DecoratedImplFindUserReviews],
    },
    {
      provide: "ProductStore",
      useClass: DecoratedMysqlProductStore,
    },
    {
      provide: "UserReviewStore",
      useClass: DecoratedDynamodbUserReviewStore,
    },
    {
      provide: "UserStore",
      useClass: DecoratedRedisUserStore,
    },
    {
      provide: "GetMysqlClient",
      useValue: () => {
        return {
          exec() {
            throw new Error("Not implemented");
          },
        };
      },
    },
    {
      provide: "GetRedisClient",
      useValue: () => {
        return {
          exec() {
            throw new Error("Not implemented");
          },
        };
      },
    },
    {
      provide: "GetDynamodbClient",
      useValue: () => {
        return {
          exec() {
            throw new Error("Not implemented");
          },
        };
      },
    },
  ],
})
export class RootModule {}

export async function createContainer() {
  const app = await NestFactory.createApplicationContext(RootModule, {
    logger: false,
  });

  return app;
}

export async function createFrozenContainer() {
  const container = await createContainer();

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
