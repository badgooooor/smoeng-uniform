import { observable, action } from "mobx";

class UserStore {
  @observable displayName = "";
  @observable photoUrl = "";
  @observable userId = "";
  @observable email = "";
  @observable telNumber = "";
  @observable department = "";
  @observable room = "";
  @observable isNewUser = false;

  @action
  update(
    displayName: string = "",
    userId: string = "",
    photoUrl: string = "",
    email: string = ""
  ) {
    this.displayName = displayName;
    this.userId = userId;
    this.photoUrl = photoUrl;
    this.email = email;
  }

  @action
  updateContact(
    telNumber: string = "",
    department: string = "",
    room: string = ""
  ) {
    this.telNumber = telNumber;
    this.department = department;
    this.room = room;
  }

  @action
  updateIsNewUser(isNewUser: boolean) {
    this.isNewUser = isNewUser;
  }

  @action
  clear() {
    this.displayName = "";
    this.userId = "";
    this.photoUrl = "";
    this.email = "";
    this.telNumber = "";
    this.department = "";
    this.room = "";
    this.isNewUser = false;
  }
}

export const user_store = new UserStore();
