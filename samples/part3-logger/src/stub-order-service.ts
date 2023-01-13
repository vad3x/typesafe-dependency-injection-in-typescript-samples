import { Logger } from "./logger";
import { FindOrderById } from "./find-order-by-id";

export class StubOrderService {
  constructor(private readonly logger: Logger) {}

  findOrderById: FindOrderById = (orderId) => {
    this.logger.info(`calling findOrderById with orderId: ${orderId}`);

    return Promise.resolve({
      id: orderId,
    });
  };
}
