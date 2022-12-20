import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private readonly http: HttpService) {
  }

  public async upload(fileType: string, body: FormData) {
    return this.http.post('/file/upload', body, {fileType})
  }

  public async change(fileType: string, body: FormData) {
    return this.http.post('/file/upload', body, {fileType})
  }


}
