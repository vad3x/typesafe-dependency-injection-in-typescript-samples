import { CreateLogger } from "../logger";
import { StubOrderStore } from "../stub-order-store";

// registry/stub-order-store.ts
export function orderStore() {
  return ({ createLogger }: { createLogger: CreateLogger }) => {
    const orderStore = new StubOrderStore(createLogger(StubOrderStore.name));

    return {
      orderStore,
    };
  };
}
