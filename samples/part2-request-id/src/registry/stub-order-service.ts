import { GetRequestId } from "../request-id";
import { StubOrderService } from "../stub-order-service";

export function stubOrderService() {
  return ({ getRequestId }: { getRequestId: GetRequestId }) => {
    const { findOrderById } = new StubOrderService(getRequestId);

    return {
      findOrderById,
    };
  };
}
