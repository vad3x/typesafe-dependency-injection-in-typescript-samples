import { Product, ProductStore } from "../../app";
import { GetMysqlClient } from "../spi";

export class MysqlProductStore implements ProductStore {
  constructor(private readonly getClient: GetMysqlClient) {}

  // NOTE: stub implementation
  findById(id: string): Promise<Product | undefined> {
    const client = this.getClient();

    return client.exec({
      id,
    });
  }
}
