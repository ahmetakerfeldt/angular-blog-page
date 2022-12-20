import {ApplicationRef, Injectable, Type} from "@angular/core";
import {ModalElementController} from "./controllers/modal-element.controller";
import {ModalStackController} from "./controllers/modal-stack.controller";
import {ModalOptions} from "./types/modal.options";
import {Modal} from "./utils/modal";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private modalElCtrl: ModalElementController,
    private modalStack: ModalStackController,
    private applicationRef: ApplicationRef,
  ) {
  }

  open(component: Type<unknown>, options: ModalOptions): Modal {
    if (!component) throw new Error();

    // TODO: modal draggable option

    const {
      modal,
      content,
      backdrop
    } = this.modalElCtrl.createElements(options.containerClass, !!options?.fullscreen, !!options?.scrollable);

    if (options.backdropDismiss) {
      this.modalElCtrl.setBackdropDismiss(modal, content, () => {
        this.dismiss()
      });
    }

    const componentRef = this.applicationRef.bootstrap(component, content);
    const instance: any = componentRef.instance;

    if (options.props) {
      Object.keys(options.props).forEach((key) => {
        instance[key] = options.props?.[key];
      })
    }

    const activeModal = new Modal(componentRef);
    this.modalStack.addActiveModal(activeModal);

    this.modalElCtrl.displayModal(modal, backdrop);

    if (instance?.onModalInit) {
      instance.onModalInit();
    }

    return activeModal;
  }

  close(data: any) {
    const activeModal = this.modalStack.activeModal;

    activeModal?.afterClose(data);

    this.dismiss();
  }

  dismiss() {
    this.modalElCtrl.closeActiveModal();
    this.modalStack.removeActiveModal();
  }
}
