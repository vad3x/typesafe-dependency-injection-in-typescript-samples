import { Injectable, Inject } from "@nestjs/common";

import { ImplFindProductById, ProductStore } from "@part6-common/app";

@Injectable()
export class DecoratedImplFindProductById extends ImplFindProductById {
  constructor(@Inject("ProductStore") productStore: ProductStore) {
    super(productStore);
  }
}
