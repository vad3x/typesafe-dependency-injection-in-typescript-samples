import { decorate, injectable, inject } from "inversify";

import { ImplFindProductById, ProductStore } from "@part6-common/app";

decorate(injectable(), ImplFindProductById);

@injectable()
export class DecoratedImplFindProductById extends ImplFindProductById {
  constructor(@inject("ProductStore") productStore: ProductStore) {
    super(productStore);
  }
}
