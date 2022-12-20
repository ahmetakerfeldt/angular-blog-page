import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostImageComponent } from './components/post-image/post-image.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PostVideoComponent } from './components/post-video/post-video.component';
import {SharedModule} from "../../shared/shared.module";
import {PostWriteComponent} from "./components/post-write/post-write.component";
import { PostBlogComponent } from './pages/post-blog/post-blog.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [
    HomeComponent,
    PostImageComponent,
    PostVideoComponent,
    PostWriteComponent,
    PostBlogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    AngularEditorModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ]
})
export class HomeModule { }
