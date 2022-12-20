import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {ModalService} from "../../../../shared/modal-module/modal.service";
import {PostImageComponent} from "../post-image/post-image.component";
import {PostVideoComponent} from "../post-video/post-video.component";
import {FormBuilder, Validators} from "@angular/forms";
import {HomeService} from "../../services/home.service";
import {ProfileService} from "../../../profile/services/profile.service";

@Component({
  selector: 'app-post-write',
  templateUrl: './post-write.component.html',
  styleUrls: ['./post-write.component.scss']
})
export class PostWriteComponent implements OnInit {
  unSuccess = ''
  user: any
  active = false
  inputForm = this.fb.group({
    content: ['', Validators.required]
  })

  constructor(public modalService: ModalService,
              private fb: FormBuilder,
              private homeService: HomeService,
              private profileService: ProfileService) {
  }

  async ngOnInit() {
    this.user = await this.profileService.getUserInfo()
    setTimeout(() => {
      setTimeout(() => {
        $('#content-post').focus();
        $('content-textarea').scroll()

        $('#content').on('change keyup keydown paste cut', 'textarea', function () {
          $(this).height(1).height(this.scrollHeight);
        }).find('textarea').trigger("change");
      });
    })
  }

  getOtherModal() {
    setTimeout(() => {
      this.active = true
    }, 2000)
  }

  imagePostModal() {
    this.modalService.dismiss()
    const modal = this.modalService.open(PostImageComponent, {
      centered: true,
      scrollable: true,
      fullscreen: false,
      backdropDismiss: true,
      containerClass: 'md-12'
    });

    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit();
      }
    }
  }

  videoPostModal() {
    this.modalService.dismiss()
    const modal = this.modalService.open(PostVideoComponent, {
      centered: true,
      scrollable: true,
      fullscreen: false,
      backdropDismiss: true,
      containerClass: 'md-12'
    });

    modal.afterClose = (data) => {
      if (data?.created) {
        this.ngOnInit();
      }
    }
  }

  async sharePost() {
    const {value} = this.inputForm
    return this.homeService.sharePost({
      content: value.content
    }).then(()=> {
      this.modalService.close({created: true});
    }).catch((err)=> {
      this.unSuccess = err.error.split(':')[1]
    })
  }
}
