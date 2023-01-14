import { FindOrderById } from "../find-order-by-id";
import { StubOrderReceiptGenerator } from "../stub-order-receipt-generator";

export function stubOrderReceiptGenerator() {
  return (needs: { findOrderById: FindOrderById }) => {
    const { generateOrderReceipt } = new StubOrderReceiptGenerator(
      needs.findOrderById
    );

    return {
      generateOrderReceipt,
    };
  };
}
