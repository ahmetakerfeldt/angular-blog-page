import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsDirective } from './directives/posts.directive';
import { ProfilePhotoDirective } from './directives/profile-photo.directive';
import { CoverPhotoDirective } from './directives/cover-photo.directive';
import {PopoverDirective} from "./directives/popover.directive";



@NgModule({
  declarations: [
    PopoverDirective,
    PostsDirective,
    ProfilePhotoDirective,
    CoverPhotoDirective
  ],
  exports: [
    PopoverDirective,
    PostsDirective,
    ProfilePhotoDirective,
    CoverPhotoDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
