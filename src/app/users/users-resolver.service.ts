import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap, filter, takeLast, catchError, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromUsers from './store/user.reducers';
import * as UserActions from './store/user.actions';

import { IUser } from './user.model';

@Injectable({
    providedIn: 'root'
})
// export class UsersResolver implements Resolve<Observable<fromUsers.IState>> {
//     constructor(private store: Store<fromUsers.IFeatureState>) {
//     }

//     resolve(route: ActivatedRouteSnapshot): Observable<fromUsers.IState> {
//         this.store.dispatch(new UserActions.FetchUsers());
//         return this.store.select('users')
//             .pipe(map((usersState: fromUsers.IState) => usersState));
//     }
// }

export class UsersResolver implements Resolve<void> {
    constructor(private store: Store<fromUsers.IFeatureState>) {
    }

    resolve(route: ActivatedRouteSnapshot): void | Observable<void> {
        this.store.dispatch(new UserActions.FetchUsers());
    }
}




