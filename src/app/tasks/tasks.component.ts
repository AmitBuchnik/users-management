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
  style,
  query,
  group
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
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({
      })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('1500ms ease-in-out')
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
