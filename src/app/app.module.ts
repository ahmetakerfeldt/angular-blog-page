import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {DefaultLayoutComponent} from "./layouts/default-layout.component";
import {SidebarComponent} from "./layouts/component/sidebar/sidebar.component";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {ModalModule} from "./shared/modal-module/modal.module";
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeUsernameComponent} from "./modules/settings/components/change-username/change-username.component";
import {ChangePasswordComponent} from "./modules/settings/components/change-password/change-password.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SidebarComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent
  ],
  imports: [
    MatTooltipModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ModalModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
