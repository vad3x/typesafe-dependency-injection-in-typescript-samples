import { FindOrderByIdFromStoreProvider } from "../find-order-by-id-from-store-provider";
import { OrderStore } from "../order-store";

export function findOrderById() {
  return ({ orderStore }: { orderStore: OrderStore }) => {
    const { findOrderById } = new FindOrderByIdFromStoreProvider(orderStore);

    return {
      findOrderById,
    };
  };
}
