import {Injectable} from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post = ''

  constructor(private http: HttpService) {
  }


  async getVideos() {
    return this.http.get('/get-videos')
  }

  async getPhotos() {
    return this.http.get('/get-photos')
  }

  async getOtherPosts() {
    return this.http.get('/other-posts')
  }

  async shareBlog(body: any) {
    return this.http.post('/post-blog', body)
  }

  async getBlogs() {
    return this.http.get('/get-blogs')
  }

  async getPost(body: any) {
    return this.http.post('/get-post', body)
  }

  async sendComment(body: any) {
    return this.http.post('/send-comment', body)
  }

  async getComments(id: any) {
    return this.http.post('/send-comment/get', {id: id})
  }

  async sendResponse(body: any) {
    return this.http.post('/send-response', body)
  }

  async getResponse(body: any) {
    return this.http.post('/send-response/get', body)
  }

  async likeRes(body: any) {
    return this.http.post('/send/response/like', body)
  }

  async deleteComment(body: any) {
    return this.http.post(`/delete-comment/${body.id}`, body)
  }

  async like(body: any) {
    return this.http.post('/like', body)
  }
  async dislike(body: any) {
    return this.http.post('/dislike', body)
  }

  async getLikes() {
    return this.http.get('/like/all')
  }
}
