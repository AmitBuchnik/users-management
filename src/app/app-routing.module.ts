import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth-guard';
import { PostsResolver } from './posts/posts-resolver.service';

import { HomeComponent } from './core/home/home.component';
import { PostsComponent } from './posts/posts.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
    resolve: { posts: PostsResolver }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
