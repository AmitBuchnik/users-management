import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, switchMap, map, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import * as fromUser from '../store/user.reducers';
import * as UserActions from '../store/user.actions';
import { IPost } from 'src/app/posts/post.model';
import { ITask } from 'src/app/tasks/task.model';
import { IUser } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: IUser
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

        const users$ = this.store.select('users');
        const posts$ = this.store.select('posts');
        const tasks$ = this.store.select('tasks');

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
