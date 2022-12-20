import {ComponentRef} from "@angular/core";

export class Modal {
  private componentRef: ComponentRef<any> | null = null;

  public get componentInstance(): { [key: string]: any } {
    return this.componentRef?.instance || {};
  }

  constructor(componentRef: ComponentRef<any>) {
    this.componentRef = componentRef;
  }

  public afterClose = (data: any) => {
  }

  public destroy() {
    this.componentRef?.destroy();
  }
}
