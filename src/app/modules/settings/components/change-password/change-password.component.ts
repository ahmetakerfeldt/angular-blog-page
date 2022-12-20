import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ModalService} from "../../../../shared/modal-module/modal.service";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  spinner = false
  success = ''
  unSuccess = ''
  inputForm = this.fb.group({
    oldPassword: [''],
    newPassword: [''],
  })

  constructor(private fb: FormBuilder, public modalService: ModalService, private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  async changePassword() {
    this.spinner = true
    const {value} = this.inputForm
    return this.settingsService.changePassword({
      oldPassword: value.oldPassword,
      newPassword: value.newPassword
    }).then((data)=> {
      this.spinner = false
      this.unSuccess = ''
      this.success = data
    }).catch((err)=> {
      this.spinner = false
      this.success = ''
      this.unSuccess = err.error.split(':')[1]
    })
  }
}
