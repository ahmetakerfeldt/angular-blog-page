import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[ProfilePhoto]'
})
export class ProfilePhotoDirective implements OnInit{
  @Input() paths!: null| undefined | string

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.elRef.nativeElement.src = environment.cdnUrlPP + this.paths
  }
}
