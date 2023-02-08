import { GetDataLoader } from "../dataloader";
import { CreateLogger } from "../logger";
import { StubOrderStore } from "../stub-order-store";

export function orderStore() {
  return (deps: {
    createLogger: CreateLogger;
    getDataLoader: GetDataLoader;
  }) => {
    const orderStore = new StubOrderStore(
      deps.createLogger(StubOrderStore.name),
      deps.getDataLoader
    );

    return {
      orderStore,
    };
  };
}
