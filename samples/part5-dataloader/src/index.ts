import { createAppRegistry } from "./create-app-registry";

const PORT = 3000;

async function main() {
  const { fastifyServer } = createAppRegistry();

  try {
    await fastifyServer.listen({ port: PORT });

    console.log("listening on port", PORT);
  } catch (err) {
    fastifyServer.log.error(err);
    process.exit(1);
  }
}

main();
