import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PhotosComponent } from './pages/photos/photos.component';
import { VideosComponent } from './pages/videos/videos.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { OtherPostsComponent } from './pages/other-posts/other-posts.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    PhotosComponent,
    VideosComponent,
    OtherPostsComponent,
    BlogsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PostsModule { }
