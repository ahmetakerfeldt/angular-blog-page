import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  success = ''
  unSuccess = ''
  eyeOpens = false
  eyeCloses = true
  inputForm = this.fb.group({
    mail: [''],
    password: [''],
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

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

  async login() {
    const {value} = this.inputForm

    return this.authService.login({
      mail: value.mail,
      password: value.password
    }).then((data)=> {
      this.unSuccess = ''
      localStorage.setItem('token', data)
      setTimeout(()=> this.router.navigate(['/home']), 2000)
      this.success = 'You successfully logged in, being redirected...'
    }).catch((err)=> {
      this.success = ''
      this.unSuccess = err.error.split(':')[1]
    })
  }
}
