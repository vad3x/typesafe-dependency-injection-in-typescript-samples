import { ID, Product } from "../model";

export interface ProductStore {
  findById(id: ID): Promise<Product | undefined>;
}
