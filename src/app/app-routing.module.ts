import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((value) => value.AuthModule)
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((value) => value.HomeModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./modules/posts/posts.module').then((value) => value.PostsModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/profile/profile.module').then((value) => value.ProfileModule)
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
