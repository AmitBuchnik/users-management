import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { reducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';
import { PostsEffects } from './posts/store/posts.effects';
import { TasksEffects } from './tasks/store/tasks.effects';
import { PostsComponent } from './posts/posts.component';
import { TasksComponent } from './tasks/tasks.component';
import { ApplicationService } from './services/application.service';
import { JQUERY_TOKEN } from './services/jQuery.service';

// import * as $ from 'bootstrap';

let jQuery: object = window['jQuery'] = window['$'];

export function app_init(appService: ApplicationService) {
  return () => appService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, PostsEffects, TasksEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: app_init,
    //   deps: [ApplicationService],
    //   multi: true
    // },
    {
      provide: JQUERY_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


