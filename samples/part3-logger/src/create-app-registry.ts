import { RegistryComposer } from "./registry-composer";
import { stubOrderService } from "./registry/stub-order-service";
import { consoleLogger } from "./registry/console-logger";
import { requestIdLoggerMetadata } from "./registry/request-id-logger-metadata";
import { stubOrderReceiptGenerator } from "./registry/stub-order-receipt-generator";
import { requestIdStore } from "./registry/request-id-store";
import { environmentLoggerMetadata } from "./registry/environment-logger-metadata";
import { fastifyServer } from "./registry/fastify-server";

export function createAppRegistry() {
  return new RegistryComposer()
    .add(environmentLoggerMetadata("local"))
    .add(requestIdStore())
    .add(requestIdLoggerMetadata())
    .add(consoleLogger())
    .add(stubOrderService())
    .add(stubOrderReceiptGenerator())
    .add(fastifyServer())
    .compose();
}
