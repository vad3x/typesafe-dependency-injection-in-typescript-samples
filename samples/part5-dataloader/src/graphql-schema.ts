import * as fs from "node:fs";
import * as path from "node:path";
import { createSchema } from "graphql-yoga";
import { FindOrderById } from "./find-order-by-id";

import { Resolvers } from "./generated/resolvers-types";

export function graphqlSchema() {
  return ({ findOrderById }: { findOrderById: FindOrderById }) => {
    return {
      graphqlSchema: createSchema({
        typeDefs: fs.readFileSync(
          path.join(__dirname, "../schema.gql"),
          "utf8"
        ),
        resolvers: {
          Query: {
            order: (_, args) => findOrderById(args.id),
          },
        } as Resolvers,
      }),
    };
  };
}
