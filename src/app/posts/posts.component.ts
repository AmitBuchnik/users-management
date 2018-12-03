import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import * as fromUsers from '../users/store/user.reducers';
import * as fromPosts from './store/posts.reducers';
import * as PostsActions from './store/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$: Observable<fromPosts.IState>;

  constructor(private store: Store<fromUsers.IFeatureState>) {
  }

  ngOnInit() {
    this.posts$ = this.store.select('posts')
      .pipe(tap((postsState: fromPosts.IState) => {
        if (!postsState.loaded) {
          this.store.dispatch(new PostsActions.FetchPosts());
        }
      }),
        // map((postsState: fromPosts.IState) => postsState)
      );
  }
}


