import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[Post]'
})
export class PostsDirective implements OnInit{
  @Input() paths!: null | undefined | string

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.elRef.nativeElement.src = environment.cdnUrlPosts + this.paths
  }

}
