import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, filter, map } from 'rxjs/operators';

import { IUser } from '../user.model';

import * as fromApp from '../../store/app.reducers';
import * as fromUsers from '../store/user.reducers';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchTerm: string = '';
  foundUsers: IUser[];

  constructor(private store: Store<fromUsers.IFeatureState>) { }

  ngOnInit() {
  }

  searchUsers(): void {
    this.store.select(fromApp.getUsersState)
      .pipe(take(1),
        map((usersState: fromUsers.IState) => {
          return usersState.users.filter(u => u.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()));
        }))
      .subscribe((users: IUser[]) => this.foundUsers = users);
  }
}
