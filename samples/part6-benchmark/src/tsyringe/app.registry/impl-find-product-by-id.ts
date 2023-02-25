import { injectable, inject } from "tsyringe";

import { ImplFindProductById, ProductStore } from "@part6-common/app";

@injectable()
export class DecoratedImplFindProductById extends ImplFindProductById {
  constructor(@inject("ProductStore") productStore: ProductStore) {
    super(productStore);
  }
}
