import { observable, action } from 'mobx';

class OrderStore {
  @observable orders = [];

  @action
  update(orders: never[] = []) {
    this.orders = orders;
  }

  @action
  clear() {
    this.orders = [];
  }
}

export const orders_store = new OrderStore();