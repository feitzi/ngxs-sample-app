import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RepoSearchInputComponent} from './repo-search-input/repo-search-input.component';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {GithubState} from './state/github/github.state';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { RepositoryResultListComponent } from './repository-result-list/repository-result-list.component';
import {NgxsActionsExecutingModule} from '@ngxs-labs/actions-executing';

@NgModule({
  declarations: [
    AppComponent,
    RepoSearchInputComponent,
    RepositoryResultListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([GithubState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgbModule,
    NgxsActionsExecutingModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
