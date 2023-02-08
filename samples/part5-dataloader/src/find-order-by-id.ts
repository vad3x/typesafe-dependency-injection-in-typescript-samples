import { ID, Order } from "./order";

export type FindOrderById = (orderId: ID) => Promise<Order | undefined>;
