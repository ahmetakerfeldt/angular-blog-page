import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {FormBuilder} from "@angular/forms";
import {FileUploadService} from "../../../../services/file-upload.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  date = new Date().toISOString().split("T")[0];
  gender = ``
  user: any
  disabled = false
  selectedFile: any
  path: any
  pathCover: any
  selectedCoverFile: any
  inputForm = this.fb.group({
    bio: [''],
    birth: [''],
    gender: ['']
  })

  constructor(
    private readonly fileUploadService: FileUploadService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
  }

  async ngOnInit() {
    return this.profileService.getUserInfo().then((info) => {
      this.user = info
      this.gender = this.user.gender

    })
  }

  getFile($event: any): void {
    if ($event.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL($event.target.files[0])
      reader.onload = (event: any) => {
        this.path = event.target.result;
      }
    }
    this.selectedFile = <File>$event.target.files[0]
  }

  getCoverFile(event: any) {
    if (event.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.pathCover = event.target.result;
      }
    }
    this.selectedCoverFile = <File>event.target.files[0]
  }

  async SaveChanges() {

    const values: any = this.inputForm.value;

    values.coverP = this.user.coverP || null;
    values.imagePath = this.user.imagePath || null;
    values.gender = this.inputForm.value.gender || null;
    values.birth = this.inputForm.value.birth || null;


    if (this.selectedCoverFile) {
      // Upload selected cover file and get path
      const formData = new FormData()
      formData.append('image', this.selectedCoverFile, this.selectedCoverFile.name);
      const res = await this.fileUploadService.upload('USER_COVER_IMAGE', formData);

      values.coverP = res.path;
    }

    if (this.selectedFile) {
      // Upload profile file and get path
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name);
      const res = await this.fileUploadService.upload('USER_PROFILE_IMAGE', formData);

      values.imagePath = res.path;
    }

    if (!this.inputForm.value.bio) {
      values.bio = this.user.bio
    }
    values.bio = this.inputForm.value.bio

    this.user = null;
    await this.profileService.updateProfile(values)
    return this.ngOnInit();
  }
}
