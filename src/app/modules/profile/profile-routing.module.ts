import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/edit-profile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
