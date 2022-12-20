import {Component, OnInit} from '@angular/core';
import {HomeService} from "./services/home.service";
import {ModalService} from "../../shared/modal-module/modal.service";
import {PostImageComponent} from "./components/post-image/post-image.component";
import {PostVideoComponent} from "./components/post-video/post-video.component";
import {PostWriteComponent} from "./components/post-write/post-write.component";
import {ProfileService} from "../profile/services/profile.service";
import {PostService} from "../posts/services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allPosts: any[] = []
  user: any
  likes: any

  constructor(private homeService: HomeService,
              private modalService: ModalService,
              private profileService: ProfileService,
              private postsService: PostService,
              private router: Router) {
  }

  async ngOnInit() {

    this.likes = await this.homeService.getLikes()
    this.user = await this.profileService.getUserInfo()
    return this.homeService.allPosts().then((data) => {
      this.allPosts = data;
      this.allPosts = this.allPosts.map((post: any) => {
        post.liked = post.PostsLikesModels?.length;
        return post;
      })
    })

  }

  openImagePostModal() {
    const modal = this.modalService.open(PostImageComponent, {
      centered: true,
      scrollable: true,
      fullscreen: false,
      backdropDismiss: true,
      containerClass: 'md-12'
    });

    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit();
      }
    }
  }

  openVideoPostModal() {
    const modal = this.modalService.open(PostVideoComponent, {
      scrollable: true,
      centered: true,
      fullscreen: false,
      backdropDismiss: true
    });
    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit()
      }
    }
  }

  openPostModal() {
    const modal = this.modalService.open(PostWriteComponent, {
      scrollable: true,
      centered: true,
      fullscreen: false,
      backdropDismiss: true
    });
    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit()
      }
    }
  }

  getPost(post: any) {
    this.postsService.post = post
    return this.router.navigate(['/posts/comments'], {queryParams: {id: post.id}})

  }

  async like(post: any) {
    post.likesCount += 1
    return this.homeService.likePost({
      postId: post.id
    })
  }

  async dislike(post: any) {
    post.likesCount -= 1
    return this.homeService.dislikePost({
      postId: post.id
    })
  }

  getLikesList(post: any) {
    let html = ``
    const likes = this.likes.filter((like: any) => like.postId === post.id);

    for (const like of likes) {
      html += `<span style="color: blue" "> -${like.sender} <br/></span>`;
    }

    return html;
  }

}
