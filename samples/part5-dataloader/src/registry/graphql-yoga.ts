import {
  createYoga,
  GraphQLSchemaWithContext,
  YogaServerOptions,
} from "graphql-yoga";
import { CreateLogger } from "../logger";

export function graphqlYoga<
  TServerContext extends Record<string, any> = object,
  TUserContext extends Record<string, any> = object
>(options?: Omit<YogaServerOptions<TServerContext, TUserContext>, "schema">) {
  return ({
    createLogger,
    graphqlSchema,
  }: {
    createLogger: CreateLogger;
    graphqlSchema: GraphQLSchemaWithContext<TUserContext & TServerContext>;
  }) => {
    const graphqlYoga = createYoga<TServerContext, TUserContext>({
      ...options,
      logging: createLogger("GraphQLYoga"),
      schema: graphqlSchema,
    });

    return {
      graphqlYoga,
      handleGraphQLNodeRequest: graphqlYoga.handleNodeRequest.bind(graphqlYoga),
    };
  };
}
