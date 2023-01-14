import { ID } from "./order";
import { Receipt } from "./receipt";

// generate-report.ts
export type GenerateOrderReceipt = (orderId: ID) => Promise<Receipt>;
