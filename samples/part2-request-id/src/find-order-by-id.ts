import { ID, Order } from "./order";

// find-order-by-id.ts
export type FindOrderById = (orderId: ID) => Promise<Order>;
