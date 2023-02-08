import Fastify from "fastify";
import { runWithRequestIdPlugin } from "../fastify-plugins";

import { graphqlRoutes, ordersRoutes } from "../routes";

export function fastifyServer() {
  return (
    deps: Parameters<typeof runWithRequestIdPlugin>[0] &
      Parameters<typeof ordersRoutes>[0] &
      Parameters<typeof graphqlRoutes>[0]
  ) => {
    const server = Fastify({});

    server.register(runWithRequestIdPlugin(deps));
    server.register(ordersRoutes(deps));
    server.register(graphqlRoutes(deps));

    return {
      fastifyServer: server,
    };
  };
}
