import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, map, filter } from 'rxjs/operators';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';

import { IUser } from '../user.model';

import * as fromApp from '../../store/app.reducers';
import * as fromUsers from '../store/user.reducers';
import * as UserActions from '../store/user.actions';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  animations: [
    trigger('list', [
      state('inDom', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void is reserve word for element not in the DOM
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0)',
            opacity: 1,
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class AllUsersComponent implements OnInit, OnDestroy {
  userListState$: Observable<fromUsers.IState>;
  usersSubscription: Subscription;
  users: IUser[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromUsers.IFeatureState>) {
  }

  ngOnInit() {
    // this.userListState$ = this.store.select(fromApp.getUsersState);

    this.route.data.subscribe((data) => {
      this.users = data['users']
    });
  }

  ngOnDestroy() {
    // this.usersSubscription.unsubscribe();
  }

  onAddUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}



