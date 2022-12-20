import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from "./modal.service";
import {ModalElementController} from "./controllers/modal-element.controller";
import {ModalStackController} from "./controllers/modal-stack.controller";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ModalService, ModalElementController, ModalStackController],
  exports: []
})
export class ModalModule {
}
