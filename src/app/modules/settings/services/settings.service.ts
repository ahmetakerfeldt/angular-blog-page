import { Injectable } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  width: any

  constructor(private http: HttpService) { }

  async changeUsername(body: any) {
    return this.http.patch('/change-username', body)
  }

  async changePassword(body: any) {
    return this.http.patch('/change-password', body)
  }

}
