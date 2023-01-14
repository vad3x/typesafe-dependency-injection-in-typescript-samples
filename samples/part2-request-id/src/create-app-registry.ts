import { RegistryComposer } from "./registry-composer";
import { stubOrderService } from "./registry/stub-order-service";
import { stubOrderReceiptGenerator } from "./registry/stub-order-receipt-generator";
import { requestIdStore } from "./registry/request-id-store";

export function createAppRegistry() {
  return new RegistryComposer()
    .add(requestIdStore())
    .add(stubOrderService())
    .add(stubOrderReceiptGenerator())
    .compose();
}
