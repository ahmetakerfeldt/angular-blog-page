import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/modal-module/modal.service";
import {FormBuilder} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import * as $ from "jquery";
import {FileUploadService} from "../../../../services/file-upload.service";

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.scss']
})
export class EditPostModalComponent implements OnInit {
  post: any
  url: any
  format: any
  path: any
  selectedFile: any
  selectedVideoFile: any
  inputForm = this.fb.group({
    content: ['']
  })

  constructor(public modalService: ModalService,
              private fb: FormBuilder,
              private profileService: ProfileService,
              private fileService: FileUploadService) {
  }

  ngOnInit(): void {
    this.post = this.profileService.post
    setTimeout(() => {
      $('#content-textareaa').focus();

      $('#content').on('change keyup keydown paste cut', 'textarea', function () {
        $(this).height(0).height(this.scrollHeight);
      }).find('textarea').trigger("change");



      $('#content-textareaq').focus();

      $('#contents').on('change keyup keydown paste cut', 'textarea', function () {
        $(this).height(0).height(this.scrollHeight);
      }).find('textarea').trigger("change");

      $('#content-textareas').focus();

      $('#contenta').on('change keyup keydown paste cut', 'textarea', function () {
        $(this).height(0).height(this.scrollHeight);
      }).find('textarea').trigger("change");






    });
  }

  getNewFile($event: any): void {
    if ($event.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL($event.target.files[0])
      reader.onload = (event: any) => {
        this.path = event.target.result;
      }
    }
    this.selectedFile = <File>$event.target.files[0]
  }

  getVideo($event: any) {
    const file = $event.target.files && $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
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

      this.selectedVideoFile = <File>$event.target.files[0]
    }

  }

  async editPost(post: any) {
    const values: any = this.inputForm.value
    if (this.selectedFile) {
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      const res = await this.fileService.change('POST_IMAGE', formData)

      values.imagePath = res.path
    }

    if (this.selectedVideoFile) {
      const formData = new FormData()
      formData.append('image', this.selectedVideoFile, this.selectedVideoFile.name)
      const res = await this.fileService.upload('POST_VIDEO', formData)

      values.videoPath = res.path
    }

    if (this.inputForm.value.content != '') {
      this.post.content = this.inputForm.value.content
    }


    await this.profileService.editPost({
      imagePath: values.imagePath,
      videoPath: values.videoPath,
      id: post.id,
      createdAt: Date.now(),
      content: this.post.content
    })
    this.modalService.dismiss()
    return this.ngOnInit()
  }
}
