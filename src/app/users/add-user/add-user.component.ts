import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from '../user.model';
import { take, map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../store/user.reducers';
import * as UserActions from '../store/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromUser.IFeatureState>) {
  }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'city': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.select(fromApp.getUsersState)
      .pipe(take(1),
        map((usersState: fromUser.IState) => usersState.users[usersState.users.length - 1].id))
      .subscribe(id => {
        let newUserId = ++id;

        let user: User = {
          id: newUserId,
          name: this.addUserForm.value.name,
          email: this.addUserForm.value.email,
          address: {
            city: this.addUserForm.value.city
          }
        }

        this.store.dispatch(new UserActions.AddUser(user));
        // this.store.dispatch(new UserActions.StoreUsers());
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
