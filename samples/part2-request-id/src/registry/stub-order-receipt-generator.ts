import { FindOrderById } from "../find-order-by-id";
import { StubOrderReceiptGenerator } from "../stub-order-receipt-generator";

export function stubOrderReceiptGenerator() {
  return ({ findOrderById }: { findOrderById: FindOrderById }) => {
    const { generateOrderReceipt } = new StubOrderReceiptGenerator(
      findOrderById
    );

    return {
      generateOrderReceipt,
    };
  };
}
