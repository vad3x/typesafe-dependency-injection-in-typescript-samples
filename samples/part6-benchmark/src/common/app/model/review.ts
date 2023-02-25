import { ID } from "./id";

export interface Review {
  id: ID;
  text: string;
  userId: ID;
  productId: ID;
}
