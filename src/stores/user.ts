import { observable, action } from 'mobx';

class UserStore {
  @observable displayName = "";
  @observable photoUrl = "";
  @observable userId = "";
  @observable email = "";
  @observable telNumber = "";

  @action
  update(displayName: string = '', userId: string = '', photoUrl: string = '', email: string = '') {
    this.displayName = displayName;
    this.userId = userId;
    this.photoUrl = photoUrl;
    this.email = email;
  }

  @action
  updateContact(telNumber: string = '') {
    this.telNumber = telNumber;
  }

  @action
  clear() {
    this.displayName = "";
    this.userId = "";
    this.photoUrl = "";
    this.email = "";
    this.telNumber = "";
  }
}

export const user_store = new UserStore();