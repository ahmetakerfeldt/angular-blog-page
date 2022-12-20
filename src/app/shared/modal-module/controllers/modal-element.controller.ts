import {Injectable} from "@angular/core";

@Injectable()
export class ModalElementController {
  public createElements(
    containerClass = 'modal-md',
    fullscreen: boolean,
    scrollable: boolean
  ) {
    const backdrop = document.createElement('div')
    const modal = document.createElement('div');
    const container = document.createElement('div');
    const content = document.createElement('div');

    backdrop.style.zIndex = '1050';

    modal.classList.add('modal');
    container.classList.add('modal-dialog');
    content.classList.add('modal-content');
    backdrop.classList.add('modal-backdrop', 'fade');

    if (containerClass) {
      containerClass.split(' ').forEach((className) => {
        modal.classList.add(className);
      })
    }

    if (fullscreen) {
      container.classList.add('modal-fullscreen');
    }

    if (scrollable) {
      container.classList.add('modal-dialog-scrollable');
    }

    modal.appendChild(container);
    container.appendChild(content);

    return {modal, container, content, backdrop};
  }

  public displayModal(modal: HTMLElement, backdrop: HTMLElement) {
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    document.body.classList.add('modal-open');
    modal.classList.add('show', 'd-block', 'fade');
    backdrop.classList.add('show');
  }

  public setBackdropDismiss(modal: HTMLElement, modalContent: HTMLElement, callback: Function) {
    modal.addEventListener('click', () => {
      callback();
    })

    modalContent.addEventListener('click', (event) => {
      event.stopPropagation();
    })
  }

  public closeActiveModal() {
    const modals = document.getElementsByClassName('modal');
    const backdrops = document.getElementsByClassName('modal-backdrop');

    if (!modals.length || !backdrops.length) return;

    if (modals.length === 1) {
      document.body.classList.remove('modal-open')
    }

    const activeModal = modals[modals.length - 1];
    const activeBackdrop = backdrops[modals.length - 1];

    if (!activeModal || !activeBackdrop) return;

    activeBackdrop.remove();
    activeModal.remove();
  }
}
