import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
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
  group,
  query,
  stagger
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
    // trigger('listAnimation', [
    //   state('inDom', style({
    //     opacity: 1,
    //     transform: 'translateX(0)'
    //   })),
    //   transition('void => *', [
    //     animate(1000, keyframes([
    //       style({
    //         transform: 'translateX(-100px)',
    //         opacity: 0,
    //         offset: 0
    //       }),
    //       style({
    //         transform: 'translateX(-50px)',
    //         opacity: 0.5,
    //         offset: 0.3
    //       }),
    //       style({
    //         transform: 'translateX(-20px)',
    //         opacity: 1,
    //         offset: 0.8
    //       }),
    //       style({
    //         transform: 'translateX(0)',
    //         opacity: 1,
    //         offset: 1
    //       })
    //     ]))
    //   ])
    // ])
    trigger('listAnimation', [
      transition('void => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class AllUsersComponent implements OnInit, OnDestroy {
  userListState$: Observable<fromUsers.IState>;
  usersSubscription: Subscription;
  users: IUser[] = [];

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



