// order.ts
type ID = string;

interface Order {
  id: ID;
}

// receipt.ts
interface Receipt {
  total: number;
  content: string;
}

// find-order-by-id.ts
export type FindOrderById = (orderId: ID) => Promise<Order>;

// generate-report.ts
export type GenerateOrderReceipt = (orderId: ID) => Promise<Receipt>;

// stub-order-service.ts
class StubOrderService {
  findOrderById: FindOrderById = (orderId) => {
    return Promise.resolve({
      id: orderId,
    });
  };
}

// registry/stub-order-service.ts
function stubOrderService() {
  return () => {
    const { findOrderById } = new StubOrderService();

    return {
      findOrderById,
    };
  };
}

// stub-order-receipt-generator.ts
export class StubOrderReceiptGenerator {
  constructor(private readonly findOrderById: FindOrderById) {}

  public generateOrderReceipt: GenerateOrderReceipt = async (orderId: ID) => {
    const order = await this.findOrderById(orderId);

    return Promise.resolve({
      total: 123,
      content: `stub content for order with id: ${order.id}`,
    });
  };
}

// registry/stub-order-receipt-generator.ts
function stubOrderReceiptGenerator() {
  return (needs: { findOrderById: FindOrderById }) => {
    const { generateOrderReceipt } = new StubOrderReceiptGenerator(
      needs.findOrderById
    );

    return {
      generateOrderReceipt,
    };
  };
}

// create-app-registry.ts
import { RegistryComposer } from "./registry-composer";

export function createAppRegistry() {
  return new RegistryComposer()
    .add(stubOrderService())
    .add(stubOrderReceiptGenerator())
    .compose();
}

// orders-routes.ts
import Fastify, { FastifyPluginCallback } from "fastify";

export function ordersRoutes(deps: {
  generateOrderReceipt: GenerateOrderReceipt;
}): FastifyPluginCallback {
  return (fastify, _, next) => {
    fastify.get("/orders/:orderId/receipt", async (request, reply) => {
      const { orderId } = request.params as {
        orderId: string;
      };

      const receipt = await deps.generateOrderReceipt(orderId);
      if (!receipt) {
        return reply.status(404).send();
      }

      return reply.send(receipt);
    });

    next();
  };
}

// index.ts
const PORT = 3000;

async function main() {
  const registry = createAppRegistry();

  const server = Fastify({});
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
