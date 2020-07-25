import { observable, action } from "mobx";

class OverlayStore {
  @observable semaphore = 0;

  @action
  add() {
    this.semaphore++;
  }

  @action
  subtract() {
    if (this.semaphore >= 1) {
      this.semaphore--;
    }
  }

  @action
  reset() {
    this.semaphore = 0;
  }
}

export const overlay_store = new OverlayStore();
