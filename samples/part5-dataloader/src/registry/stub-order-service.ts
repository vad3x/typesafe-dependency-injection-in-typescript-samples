import { CreateLogger } from "../logger";
import { StubOrderService } from "../stub-order-service";

export function stubOrderService() {
  return ({ createLogger }: { createLogger: CreateLogger }) => {
    const { findOrderById } = new StubOrderService(
      createLogger(StubOrderService.name)
    );

    return {
      findOrderById,
    };
  };
}
