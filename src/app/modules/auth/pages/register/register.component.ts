import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  success = ''
  unSuccess: any = []
  eyeOpens = false
  eyeCloses = true
  inputForm = this.fb.group({
    mail: [''],
    username: [''],
    password: [''],
  })
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  eyeOpen() {
    this.eyeOpens = false
    this.eyeCloses = true
  }

  eyeClose() {
    this.eyeOpens = true
    this.eyeCloses = false
  }

  async register() {

    const {value} = this.inputForm

    return this.authService.register({
      mail: value.mail,
      username: value.username,
      password: value.password
    }).then((data)=> {
      this.success = data
      this.unSuccess = []
    }).catch((err)=> {
      this.unSuccess = err.error
      this.success = ''
      setTimeout(()=> this.unSuccess = [], 3000)
    })
  }
}
