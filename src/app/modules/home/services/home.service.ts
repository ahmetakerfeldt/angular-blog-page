import { Injectable } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpService) { }

  async postImage(formData: any) {
    return  this.http.post('/post-image', formData)
  }

  async postContent(body: any) {
    return this.http.post('/post-image/content', body)
  }

  async postVideo(formData: any) {
    return this.http.post('/post-video', formData)
  }

  async postContentForVideo(body: any) {
    return this.http.post('/post-video/content', body)
  }

  async allPosts() {
    return this.http.get('/all-posts')
  }

  async sharePost(body: any) {
    return this.http.post('/post-text', body)
  }

  async likePost(body: any) {
    return this.http.post('/like-post', body)
  }

  async dislikePost(body: any) {
    return this.http.post('/dislike-post', body)
  }

  async getLikes() {
    return this.http.get('/like-post')
  }


}
