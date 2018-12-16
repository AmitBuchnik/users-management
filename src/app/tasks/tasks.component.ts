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

import { ITask } from './task.model';

import * as fromApp from '../store/app.reducers';
import * as fromUsers from '../users/store/user.reducers';
import * as fromTasks from './store/tasks.reducers';
import * as TasksActions from './store/tasks.actions';
import * as UserActions from '../users/store/user.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('table', [
      state('inDom', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
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
export class TasksComponent implements OnInit {
  tasks: ITask[];
  filteredTasks: ITask[];
  posts$: Observable<fromTasks.IState>;

  constructor(private route: ActivatedRoute,
    private store: Store<fromUsers.IFeatureState>) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.tasks = data['tasks']
      this.filteredTasks = this.tasks;
    });
  }

  filterTable(filterText) {
    switch (filterText) {
      case 'all':
        this.filteredTasks = this.tasks.slice();
        break;

      case 'completed':
        this.filteredTasks = this.tasks.filter(t => t.completed);
        break;
        
      case 'uncompleted':
        this.filteredTasks = this.tasks.filter(t => !t.completed);
        break;
    }
  }
}
