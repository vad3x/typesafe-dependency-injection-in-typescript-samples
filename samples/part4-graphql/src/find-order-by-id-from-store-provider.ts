import { FindOrderById } from "./find-order-by-id";
import { OrderStore } from "./order-store";

export class FindOrderByIdFromStoreProvider {
  constructor(private readonly store: OrderStore) {}

  findOrderById: FindOrderById = (orderId) => {
    return this.store.find(orderId);
  };
}
