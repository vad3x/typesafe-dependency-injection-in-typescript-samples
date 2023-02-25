import { ImplFindProductById, ProductStore } from "@part6-common/app";

export class DecoratedImplFindProductById extends ImplFindProductById {
  public static inject = ["ProductStore"] as const;

  constructor(productStore: ProductStore) {
    super(productStore);
  }
}
