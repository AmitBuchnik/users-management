import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  keyframes,
  style,
  group
} from '@angular/animations';

import { IPost } from 'src/app/posts/post.model';
import { ITask } from 'src/app/tasks/task.model';
import { IUser } from '../user.model';

import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../store/user.reducers';
import * as fromPosts from '../../posts/store/posts.reducers';
import * as fromTasks from '../../tasks/store/tasks.reducers';
import * as UserActions from '../store/user.actions';
import * as PostsActions from '../../posts/store/posts.actions';
import * as TasksActions from '../../tasks/store/tasks.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
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
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class UserDetailsComponent implements OnInit {
  user: IUser;
  posts: IPost[];
  tasks: ITask[];

  @ViewChild('form') userForm: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromUser.IFeatureState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const userId = +params['id'];

        this.store.dispatch(new PostsActions.FetchPosts());
        this.store.dispatch(new TasksActions.FetchTasks());

        const users$ = this.store.select(fromApp.getUsersState);
        const posts$ = this.store.select('posts')
          .pipe(filter((postsState: fromPosts.IState) => postsState && postsState.loaded));
        const tasks$ = this.store.select('tasks')
          .pipe(filter((tasksState: fromTasks.IState) => tasksState &&tasksState.loaded));

        const combined = combineLatest(users$, posts$, tasks$);
        combined.pipe(take(1))
          .subscribe(([userState, postsState, tasksState]) => {
            this.user = userState.users.find(u => u.id === userId);
            this.posts = postsState.posts.filter(p => p.userId === userId);
            this.tasks = tasksState.tasks.filter(t => t.userId === userId && !t.completed);
          });
      });
  }

  onSubmit() {
    this.store.dispatch(new UserActions.UpdateUser({ index: this.user.id, user: this.user }));
    // this.store.dispatch(new UserActions.StoreUsers());
    this.router.navigate(['/users']);
  }

  onDelete() {
    this.store.dispatch(new UserActions.DeleteUser(this.user.id));
    this.router.navigate(['/users']);
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
