import { Injectable } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  async register(body: any) {
    return this.http.post('/register',{mail: body.mail, username: body.username, password: body.password})
  }

  async login(body: any) {
    return this.http.post('/login', {mail: body.mail, password: body.password})
  }

}
