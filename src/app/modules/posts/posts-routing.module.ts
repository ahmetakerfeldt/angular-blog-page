import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideosComponent} from "./pages/videos/videos.component";
import {PhotosComponent} from "./pages/photos/photos.component";
import {OtherPostsComponent} from "./pages/other-posts/other-posts.component";
import {BlogsComponent} from "./pages/blogs/blogs.component";
import {CommentsComponent} from "./components/comments/comments.component";

const routes: Routes = [
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'other-posts',
    component: OtherPostsComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'comments',
    component: CommentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
