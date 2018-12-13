import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, filter, map, mergeMap, combineAll } from 'rxjs/operators';
import { combineLatest, Observable, Subscription } from 'rxjs';
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
import { IUser, User } from '../user.model';

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
      // transition('void => *', [
      //   animate(1000, keyframes([
      //     style({
      //       transform: 'translateX(-100px)',
      //       opacity: 0,
      //       offset: 0
      //     }),
      //     style({
      //       transform: 'translateX(-50px)',
      //       opacity: 0.5,
      //       offset: 0.3
      //     }),
      //     style({
      //       transform: 'translateX(-20px)',
      //       opacity: 1,
      //       offset: 0.8
      //     }),
      //     style({
      //       transform: 'translateX(0)',
      //       opacity: 1,
      //       offset: 1
      //     })
      //   ]))
      // ]),
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
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: IUser = {
    id: 0,
    name: '',
    email: '',
    address: {
      city: ''
    }
  };
  posts$: Observable<IPost[]>;
  tasks$: Observable<ITask[]>;
  posts: IPost[];
  tasks: ITask[];
  newPosts: IPost[] = [];
  newTasks: ITask[] = [];
  postsSubscription: Subscription;
  tasksSubscription: Subscription;
  selectedPostIndex: number;
  selectedTaskIndex: number;
  lastPostsId: number;
  lastTasksId: number;

  @ViewChild('form') userForm: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromUser.IFeatureState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const userId = +params['id'];

        this.store.select(fromApp.getUsersState)
          .subscribe((userState: fromUser.IState) => this.user = userState.users.find(u => u.id === userId));

        // this.posts$ = this.store.select('posts')
        //   .pipe(filter((postsState: fromPosts.IState) => postsState && postsState.loaded)
        //     , map((postsState: fromPosts.IState) => postsState.posts.filter(p => p.userId === userId)));
        // this.tasks$ = this.store.select('tasks')
        //   .pipe(filter((tasksState: fromTasks.IState) => tasksState && tasksState.loaded)
        //     , map((tasksState: fromTasks.IState) => tasksState.tasks.filter(t => t => t.userId === userId && !t.completed)));

        this.postsSubscription = this.store.select('posts')
          .pipe(filter((postsState: fromPosts.IState) => postsState && postsState.loaded)
            , map((postsState: fromPosts.IState) => postsState.posts.filter(p => p.userId === userId)))
          .subscribe(p => {
            this.posts = p;
            this.lastPostsId = this.getLastId(this.posts);
          });
        this.tasksSubscription = this.store.select('tasks')
          .pipe(filter((tasksState: fromTasks.IState) => tasksState && tasksState.loaded)
            , map((tasksState: fromTasks.IState) => tasksState.tasks.filter(t => t.userId === userId && t.completed === false)))
          .subscribe(t => {
            this.tasks = t;
            this.lastTasksId = this.getLastId(this.tasks);
          });
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
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

  selectPost(index: number) {
    this.selectedPostIndex = index;
  }

  selectTask(index: number) {
    this.selectedTaskIndex = index;
  }

  onNewPost() {
    this.newPosts.push({
      id: this.lastPostsId++,
      userId: this.user.id,
      UserName: this.user.name,
      title: '',
      body: ''
    });
  }

  onAddPost(title: string, body: string, index: number) {
    this.newPosts[index].title = title;
    this.newPosts[index].body = body;
    this.store.dispatch(new PostsActions.AddPost(this.newPosts[index]));
    this.newPosts = <IPost[]> this.removeById(this.newPosts, this.newPosts[index].id);
  }

  onRemovePost(id: number, controlIndex: number) {
    this.newPosts = <IPost[]> this.removeById(this.newPosts, id);

    // for (let name in this.userForm.controls['postData']) {
    //       this.userForm.controls[name].setErrors(null);
    //     }
  }

  onDeletePost(postId: number) {
    this.store.dispatch(new PostsActions.DeletePost(postId));
  }

  onNewTask() {
    this.newTasks.push({
      id: this.lastTasksId++,
      userId: this.user.id,
      title: '',
      completed: false
    });
  }

  onAddTask(title: string, completed: boolean, index: number) {
    this.newTasks[index].title = title;
    this.newTasks[index].completed = completed;
    this.store.dispatch(new TasksActions.AddTask(this.newTasks[index]));
    this.newTasks = <ITask[]> this.removeById(this.newTasks, this.newTasks[index].id);
  }

  onRemoveTask(id: number, controlIndex: number) {
    this.newTasks = <ITask[]> this.removeById(this.newTasks, id);
  }

  onDeleteTask(taskId: number) {
    this.store.dispatch(new TasksActions.DeleteTask(taskId));
  }

  getLastId(items: Array<IPost | ITask>): number {
    return Math.max(...items.map(p => p.id), 0) + 1;
  }

  removeById(items: Array<IPost | ITask>, id: number): Array<IPost | ITask> {
    return items.filter(item => item.id !== id);
  }
}
