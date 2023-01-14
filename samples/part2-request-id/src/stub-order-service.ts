import { FindOrderById } from "./find-order-by-id";
import { GetRequestId } from "./request-id";

export class StubOrderService {
  constructor(private readonly getRequestId: GetRequestId) {}

  findOrderById: FindOrderById = (orderId) => {
    const requestId = this.getRequestId();

    console.info(
      `calling findOrderById with orderId: ${orderId}, requestId: ${requestId}`
    );

    return Promise.resolve({
      id: orderId,
    });
  };
}
