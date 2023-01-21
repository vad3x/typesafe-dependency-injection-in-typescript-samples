import { ID } from "./order";
import { Receipt } from "./receipt";

export type GenerateOrderReceipt = (
  orderId: ID
) => Promise<Receipt | undefined>;
