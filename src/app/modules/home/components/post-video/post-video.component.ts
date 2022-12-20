import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {FormBuilder} from "@angular/forms";
import {HomeService} from "../../services/home.service";
import {ModalService} from "../../../../shared/modal-module/modal.service";

@Component({
  selector: 'app-post-video',
  templateUrl: './post-video.component.html',
  styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent implements OnInit {
  unSuccess = ''
  url: any
  format: any
  selectedFile: any
  inputForm = this.fb.group({
    content: ['']
  })

  constructor(private fb: FormBuilder, private homeService: HomeService, public modalService: ModalService) { }

  ngOnInit(): void {
  }

  getVideo($event: any) {
    const file = $event.target.files && $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        setTimeout(() => {
          $('#content-video').focus();

          $('#contentForVideo').on('change keyup keydown paste cut', 'textarea', function () {
            $(this).height(0).height(this.scrollHeight);
          }).find('textarea').trigger("change");
        });

      }

      this.selectedFile = <File>$event.target.files[0]
    }

  }

  async postVideo() {

    if (!this.url) {
      this.unSuccess = 'Please upload a video!'
      return ;
    }

    let formData = new FormData()
    formData.append('video', this.selectedFile, this.selectedFile.name)

    const {value} = this.inputForm
    return this.homeService.postVideo(formData).then((path)=> {
      return this.homeService.postContentForVideo({
        content: value.content,
        path: path
      }).then(()=> {
        this.modalService.close({created: true});
      })
    })
  }
}
