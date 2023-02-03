import { ID, Order } from "./order";

export interface OrderStore {
  find(id: ID): Promise<Order | undefined>;
}
