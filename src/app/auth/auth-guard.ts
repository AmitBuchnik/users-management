import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import * as UserActions from '../users/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
    private store: Store<fromApp.IAppState>) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(take(1),
        map((authState: fromAuth.IState) => {
          if (authState.authenticated) {
            return true;
          }
          this.router.navigate(['/users']);
          return false;
        }));
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select('auth')
      .pipe(take(1),
        map((authState: fromAuth.IState) => {
          return authState.authenticated;
        }));
  }
}
