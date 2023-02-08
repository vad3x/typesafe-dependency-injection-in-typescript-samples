import { BatchLoadFn, GetDataLoader } from "./dataloader";
import { Logger } from "./logger";
import { ID, Order } from "./order";
import { OrderStore } from "./order-store";

export class StubOrderStore implements OrderStore {
  constructor(
    private readonly logger: Logger,
    private readonly getDataLoader: GetDataLoader<ID, Order | undefined>
  ) {}

  find(id: ID): Promise<Order | undefined> {
    const loader = this.getDataLoader(this.batchLoad);

    return loader.load(id);
  }

  private batchLoad: BatchLoadFn<ID, Order | undefined> = (ids) => {
    this.logger.info(`calling StubOrderStore.batchLoad with orderIds: ${ids}`);

    return Promise.resolve(
      ids.map((id) => ({
        id,
      }))
    );
  };
}
