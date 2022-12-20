import {Injectable} from "@angular/core";
import {Modal} from "../utils/modal";

@Injectable()
export class ModalStackController {
  private readonly stack: Modal[] = [];

  public get activeModal() {
    return this.stack[this.stack.length - 1];
  }

  public addActiveModal(modal: Modal) {
    this.stack.push(modal);
  }

  public removeActiveModal() {
    this.activeModal?.destroy();
    this.stack.pop();
  }
}
