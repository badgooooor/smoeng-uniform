import Product from "./product";

export default interface Order {
  orders: Array<Product>;
  status: string;
}