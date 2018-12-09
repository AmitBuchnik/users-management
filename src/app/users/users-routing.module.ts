import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersResolver } from './users-resolver.service';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: AllUsersComponent,
        pathMatch: 'full',
        resolve: { users: UsersResolver }
      },
      {
        path: 'new',
        component: AddUserComponent
      },
      {
        path: ':id',
        component: UserDetailsComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
