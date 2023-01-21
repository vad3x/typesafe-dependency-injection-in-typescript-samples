import { fastify } from "fastify";
import { runWithRequestIdPlugin } from "../fastify-plugins";

import { ordersRoutes } from "../routes";

export function fastifyServer() {
  return (
    deps: Parameters<typeof runWithRequestIdPlugin>[0] &
      Parameters<typeof ordersRoutes>[0]
  ) => {
    const server = fastify({});

    server.register(runWithRequestIdPlugin(deps));
    server.register(ordersRoutes(deps));

    return {
      fastifyServer: server,
    };
  };
}
