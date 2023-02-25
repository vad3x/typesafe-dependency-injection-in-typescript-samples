import { FindProductById } from "../api";

import { ProductStore } from "../spi";

export class ImplFindProductById {
  constructor(private readonly store: ProductStore) {}

  findProductById: FindProductById = (id) => {
    return this.store.findById(id);
  };
}
