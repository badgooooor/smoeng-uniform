import { observable, action, computed } from 'mobx';

class UserStore {
  @observable displayName = "";
  @observable userId = "";

  @action
  update(displayName: string = '', userId: string = '') {
    this.displayName = displayName;
    this.userId = userId;
  }

  @action
  clear() {
    this.displayName = "";
    this.userId = "";
  }
}

export const user_store = new UserStore();