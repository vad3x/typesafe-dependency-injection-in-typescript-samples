import Fastify from "fastify";

import { createAppRegistry } from "./create-app-registry";
import { ordersRoutes } from "./routes";
import { runWithRequestIdPlugin } from "./fastify-plugins";

// index.ts
const PORT = 3000;

async function main() {
  const registry = createAppRegistry();

  const server = Fastify({});
  server.register(runWithRequestIdPlugin(registry));
  server.register(ordersRoutes(registry));

  try {
    await server.listen({ port: PORT });

    console.log("listening on port", PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
