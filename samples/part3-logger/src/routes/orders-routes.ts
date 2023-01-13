import { FastifyPluginCallback } from "fastify";
import { GenerateOrderReceipt } from "../generate-order-receipt";

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
