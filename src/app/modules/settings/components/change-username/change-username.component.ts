import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../../shared/modal-module/modal.service";
import {FormBuilder} from "@angular/forms";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {
  spinner = false
  success = ''
  unSuccess = ''
  inputForm = this.fb.group({
    username: [''],
    password: [''],
  })

  constructor(public modalService: ModalService, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  async changeUsername() {
    this.spinner = true
    const {value} = this.inputForm
    return this.settingsService.changeUsername({
      username: value.username,
      password: value.password
    }).then((data)=> {
      this.spinner = false
      this.unSuccess = ''
      this.success = data
      setTimeout(()=> {
       return this.ngOnInit(), 4000
      })
    }).catch((err)=> {
      this.spinner = false
      this.success = ''
      this.unSuccess = err.error.split(':')[1]
    })
  }
}
