import { ID, Product } from "../model";

export type FindProductById = (id: ID) => Promise<Product | undefined>;
