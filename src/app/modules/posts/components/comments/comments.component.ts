import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ProfileService} from "../../../profile/services/profile.service";
import * as $ from "jquery";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../home/services/home.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  responses: any
  responseCount: any
  allLikes: any
  usernames: any [] = []
  likes: any
  nullName: any
  post: any
  allComments: any
  liked = false
  seeMore = true
  seeLess = false
  short: any[] = []
  value: any
  query: any
  user: any
  comments: any
  inputForm = this.fb.group({
    comment: ['', Validators.required]
  })
  responseForm = this.fb.group({
    response: ['']
  })

  constructor(private postsService: PostService,
              private profileService: ProfileService,
              private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private homeService: HomeService) {
  }

  async ngOnInit() {
    this.allLikes = await this.homeService.getLikes()

    setTimeout(() => {
      $('#content-textarea').focus();

      $('#content').on('change keyup keydown paste cut', 'textarea', function () {
        $(this).height(0).height(this.scrollHeight);
      }).find('textarea').trigger("change");
    });
    this.user = await this.profileService.getUserInfo()
    this.query = this.activeRoute.queryParams
    this.value = this.query.value
    this.post = await this.postsService.getPost({
      id: this.value.id
    });

    this.post.liked = this.post.PostsLikesModels.length
    this.comments = await this.postsService.getComments(this.value.id)

    this.comments = this.comments.map((comment: any) => {
      comment.liked = comment.CommentsLikesModels?.length;
      return comment;
    })

    if (this.comments.length >= 3) {
      this.short.push(this.comments[0], this.comments[1], this.comments[2])
    }
    if (this.comments.length <= 2) {
      this.short.push(this.comments[0])
    }
    this.allComments = this.comments.length
    this.likes = await this.postsService.getLikes()
  }


  async sendComment() {
    const {value} = this.inputForm
    if (value.comment == '') {
      return;
    }
    return this.postsService.sendComment({
      comment: value.comment,
      postId: this.value.id
    }).then(() => {
      value.comment = ''
    }).then(() => {
      this.short = [];
      this.inputForm.reset()
      return this.ngOnInit()
    })
  }

  seenMore() {
    this.short = this.comments
    this.seeMore = false
    this.seeLess = true

  }

  seenLess() {
    this.short = []
    if (this.comments.length > 3) {
      this.short.push(this.comments[0], this.comments[1], this.comments[2])
    }
    if (this.comments.length <= 3) {
      this.short.push(this.comments[0])
    }
    this.seeMore = true
    this.seeLess = false
  }

  async like(comment: any) {
    comment.likesCount += 1
    return this.postsService.like({
      postId: comment.postId,
      commentId: comment.id
    })
  }

  async dislike(comment: any) {
    comment.likesCount -= 1
    return this.postsService.dislike({
      commentId: comment.id,
      postId: comment.postId
    })
  }

  async sendResponse(comment: any) {
    const {value} = this.responseForm
    if (value.response == '') {
      this.nullName = 'Please enter a response!'
      return;
    }
    this.nullName = ''
    return this.postsService.sendResponse({
      response: value.response,
      commentId: comment.id,
      postId: this.value.id
    }).then(() => {
      this.getResponse(comment)
      this.responseForm.reset()
    })
  }

  async getResponse(post: any) {
    return this.postsService.getResponse({
      commentId: post.id
    }).then((data) => {
      post.responses = data;
      this.responses = data
      this.responseCount = data.length
    })
  }

  async deleteComment(comment: any) {
    return this.postsService.deleteComment({
      id: comment.id,
      postId: comment.postId
    }).then(() => {
      this.short = [];
      return this.ngOnInit()
    })
  }

  async likePost(post: any) {
    post.likesCount +=1
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
    const likes = this.allLikes.filter((like: any) => like.postId === post.id);

    for (const like of likes) {
      html += `<span style="color: blue"> -${like.sender} <br/></span>`;
    }

    return html;
  }
}
