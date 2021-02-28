import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {RepoSearchValueChanged, SearchForRepos} from '../state/github/github.actions';
import {ActionsExecuting, actionsExecuting} from '@ngxs-labs/actions-executing';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-repo-search-input',
  templateUrl: './repo-search-input.component.html',
  styleUrls: ['./repo-search-input.component.scss']
})
export class RepoSearchInputComponent {

  constructor(private store: Store) {
  }

  @Select(actionsExecuting([SearchForRepos]))
  public isRepoSearchingRunning$: Observable<ActionsExecuting>;


  public onInputValueChanged(value: string): void {
    this.store.dispatch(new RepoSearchValueChanged(value));
  }
}
