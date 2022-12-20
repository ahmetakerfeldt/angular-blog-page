import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';

declare const bootstrap: any;

@Directive({
  selector: '[popover]'
})
export class PopoverDirective implements OnInit, OnDestroy {
  @Input() placement: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() titleHtml!: string;
  @Input() contentHtml!: string;

  private popover!: any;
  private titleElement!: any;
  private contentElement: any;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      const jQuery = $ as any;

      const element = jQuery(this.elRef.nativeElement);

      this.titleElement = document.createElement('div');
      this.titleElement.innerHTML = this.titleHtml;

      this.contentElement = document.createElement('div');
      this.contentElement.innerHTML = this.contentHtml;

      this.popover = new bootstrap.Popover(element, {
        container: 'body',
        title: this.titleElement,
        content: this.contentElement,
        placement: this.placement,
        html: true
      });
    });
  }

  ngOnDestroy() {
    this.titleElement.remove();
    this.contentElement.remove();
    this.popover.dispose();
  }
}
