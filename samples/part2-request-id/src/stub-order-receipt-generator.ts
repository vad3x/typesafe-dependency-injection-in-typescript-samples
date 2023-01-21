import { ID } from "./order";
import { FindOrderById } from "./find-order-by-id";
import { GenerateOrderReceipt } from "./generate-order-receipt";

export class StubOrderReceiptGenerator {
  constructor(private readonly findOrderById: FindOrderById) {}

  public generateOrderReceipt: GenerateOrderReceipt = async (orderId: ID) => {
    const order = await this.findOrderById(orderId);

    return Promise.resolve({
      total: 123,
      content: `stub content for order with id: ${order.id}`,
    });
  };
}
