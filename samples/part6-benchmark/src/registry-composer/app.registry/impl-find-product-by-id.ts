import { ImplFindProductById, ProductStore } from "@part6-common/app";

export function implFindProductById() {
  return (deps: { productStore: ProductStore }) => {
    const { findProductById } = new ImplFindProductById(deps.productStore);

    return {
      findProductById,
    };
  };
}
