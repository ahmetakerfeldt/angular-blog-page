import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {SharedModule} from "../../shared/shared.module";
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditPostModalComponent } from './components/edit-post-modal/edit-post-modal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    EditPostModalComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ProfileModule { }
