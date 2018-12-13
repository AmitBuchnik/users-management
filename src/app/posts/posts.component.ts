import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  keyframes,
  style
} from '@angular/animations';

import { IPost } from './post.model';

import * as fromApp from '../store/app.reducers';
import * as fromUsers from '../users/store/user.reducers';
import * as fromPosts from './store/posts.reducers';
import * as PostsActions from './store/posts.actions';
import * as UserActions from '../users/store/user.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('table', [
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
export class PostsComponent implements OnInit {
  posts: IPost[];
  filteredPosts: IPost[];
  posts$: Observable<fromPosts.IState>;
  filter: number;

  constructor(private route: ActivatedRoute,
    private store: Store<fromUsers.IFeatureState>) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.posts = data['posts']
      this.filteredPosts = this.posts;
    });
  }

  onInput() {
    if (!this.filter) {
      this.filteredPosts = this.posts.slice();
    } else {
      this.filteredPosts = this.posts.filter(p => p.userId === this.filter);
    }
  }
}






