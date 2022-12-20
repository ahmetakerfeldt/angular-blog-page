import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import {HomeService} from "../../services/home.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ModalService} from "../../../../shared/modal-module/modal.service";

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss']
})
export class PostImageComponent implements OnInit {
  unSuccess = ''
  active = false
  path: any;
  selectedFile: any
  inputForm = this.fb.group({
    content: [''],
  })

  constructor(private homeService: HomeService, private fb: FormBuilder, public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  getFile($event: any): void {
      if ($event.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL($event.target.files[0])
      reader.onload = (event: any) => {
        this.path = event.target.result;

        setTimeout(() => {
          $('#content-textarea').focus();

          $('#content').on('change keyup keydown paste cut', 'textarea', function () {
            $(this).height(0).height(this.scrollHeight);
          }).find('textarea').trigger("change");
        });
      }
    }
    this.selectedFile = <File>$event.target.files[0]
  }

  async postImage() {

    if (!this.path){
      this.unSuccess = 'Please upload a image!'
      return;
    }

    let formData = new FormData()
    formData.append('image', this.selectedFile, this.selectedFile.name)

    const {value} = this.inputForm
    return this.homeService.postImage(formData).then((path)=> {
      return this.homeService.postContent({
        content: value.content,
        path: path
      }).then(() => {
        this.modalService.close({created: true});
      }).catch((err)=> {
        console.log(err.error)
      })
    })
  }
}
