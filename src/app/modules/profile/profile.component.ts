import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./services/profile.service";
import {ModalService} from "../../shared/modal-module/modal.service";
import {EditPostModalComponent} from "./components/edit-post-modal/edit-post-modal.component";
import {ChangeUsernameComponent} from "../settings/components/change-username/change-username.component";
import {ChangePasswordComponent} from "../settings/components/change-password/change-password.component";
import {PostService} from "../posts/services/post.service";
import {Router} from "@angular/router";
import {HomeService} from "../home/services/home.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  system: any
  posts: any[] = []
  user: any
  date = Date.now()
  likes: any

  constructor(private profileService: ProfileService,
              public modalService: ModalService,
              private postsService: PostService,
              private router: Router,
              private homeService: HomeService) {
  }

  async ngOnInit() {
    this.likes = await this.homeService.getLikes()
    return this.profileService.userPosts().then((data) => {
      return this.profileService.getUserInfo().then((info) => {
        this.posts = data
        this.user = info
      }).then(() => {
        return this.profileService.getSystem().then((system) => {
          this.system = system
        }).then(()=> {
          this.posts = this.posts.map((post: any) => {
            post.liked = post.PostsLikesModels?.length;
            return post;
          })
        })
      })
    })
  }

  async deletePost(post: any) {
    return this.profileService.deletePost(post.id).then(() => {
      return this.ngOnInit()
    })
  }

  openEditModal(post: any) {
    this.profileService.post = post
    const modal = this.modalService.open(EditPostModalComponent, {
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

  openUsernameModal() {
    const modal = this.modalService.open(ChangeUsernameComponent, {
      scrollable: false,
      centered: true,
      fullscreen: false,
      backdropDismiss: false,
      containerClass: 'my-5'
    });
    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit()
      }
    }
  }

  openPasswordModal() {
    const modal = this.modalService.open(ChangePasswordComponent, {
      scrollable: false,
      centered: true,
      fullscreen: false,
      backdropDismiss: false,
      containerClass: 'my-5'
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

  async likePost(post: any) {
    post.likesCount += 1
    return this.homeService.likePost({
      postId: post.id
    })
  }

  async dislikePost(post: any) {
    post.likesCount -= 1
    return this.homeService.dislikePost({
      postId: post.id
    })
  }

  getLikesList(post: any) {
    let html = ``
    const likes = this.likes.filter((like: any) => like.postId === post.id);

    for (const like of likes) {
      html += `<span style="color: blue"> -${like.sender} <br/></span>`;
    }

    return html;
  }
}
