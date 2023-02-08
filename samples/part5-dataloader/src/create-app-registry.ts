import { RegistryComposer } from "./registry-composer";
import { consoleLogger } from "./registry/console-logger";
import { requestIdLoggerMetadata } from "./registry/request-id-logger-metadata";
import { stubOrderReceiptGenerator } from "./registry/stub-order-receipt-generator";
import { requestIdStore } from "./registry/request-id-store";
import { environmentLoggerMetadata } from "./registry/environment-logger-metadata";
import { orderStore } from "./registry/stub-order-store";
import { findOrderById } from "./registry/find-order-by-id-from-store";
import { graphqlYoga } from "./registry/graphql-yoga";
import { fastifyServer } from "./registry/fastify-server";
import { dataLoaderStore } from "./registry/dataloader-store";

import { graphqlSchema } from "./graphql-schema";

export function createAppRegistry() {
  return new RegistryComposer()
    .add(environmentLoggerMetadata("local"))
    .add(requestIdStore())
    .add(requestIdLoggerMetadata())
    .add(dataLoaderStore())
    .add(consoleLogger())
    .add(orderStore())
    .add(findOrderById())
    .add(stubOrderReceiptGenerator())
    .add(graphqlSchema())
    .add(graphqlYoga())
    .add(fastifyServer())
    .compose();
}
