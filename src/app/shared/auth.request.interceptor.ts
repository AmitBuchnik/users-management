import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { switchMap, take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.IAppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request Intercepted', req);

        // map will wrap the returned value with observable, switchMap returns a new observable
        return this.store.select('auth')
            .pipe(take(1),
                switchMap((authState: fromAuth.IState) => {
                    const copiedReq = req.clone({
                        params: req.params.set('auth', authState.token)
                    });
                    return next.handle(copiedReq);
                }));
    }
}


