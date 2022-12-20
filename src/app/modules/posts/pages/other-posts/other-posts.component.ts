import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {HomeService} from "../../../home/services/home.service";

@Component({
  selector: 'app-other-posts',
  templateUrl: './other-posts.component.html',
  styleUrls: ['./other-posts.component.scss']
})
export class OtherPostsComponent implements OnInit {
  posts: any[] = []
  likes: any

  constructor(private postsService: PostService, private router: Router, private homeService: HomeService) { }

  async ngOnInit() {
    this.likes = await this.homeService.getLikes()
    return this.postsService.getOtherPosts().then((data)=> {
      this.posts = data
    }).then(()=> {
      this.posts = this.posts.map((post: any) => {
        post.liked = post.PostsLikesModels?.length;
        return post;
      })
    })
  }

  getPostForOthers(post: any) {
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
