import { Logger } from "./logger";
import { ID, Order } from "./order";
import { OrderStore } from "./order-store";

export class StubOrderStore implements OrderStore {
  constructor(private readonly logger: Logger) {}

  find(id: ID): Promise<Order | undefined> {
    this.logger.info(`calling StubOrderStore.find with orderId: ${id}`);

    return Promise.resolve({
      id,
    });
  }
}
