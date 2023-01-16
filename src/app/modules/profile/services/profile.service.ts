import { Injectable } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  post: any

  constructor(private http: HttpService) { }

  async userPosts() {
    return this.http.get('/user-posts')
  }

  async deletePost(id: number) {
    return this.http.post('/delete-post', {id: id})
  }

  async getUserInfo() {
    return this.http.get('/get-user')
  }

  async getSystem() {
    return this.http.get('/get-user/system')
  }

  async updateProfile(body: any) {
    return this.http.post('/edit-profile', body)
  }

  async editPost(body: any) {
    return this.http.patch('/edit-post', body)
  }

}
