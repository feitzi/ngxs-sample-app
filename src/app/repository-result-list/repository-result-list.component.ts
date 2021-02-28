import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GithubState, IGithubRep} from '../state/github/github.state';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-repository-result-list',
  templateUrl: './repository-result-list.component.html',
  styleUrls: ['./repository-result-list.component.scss']
})
export class RepositoryResultListComponent {

  @Select(GithubState.repositories)
  public repositories$: Observable<IGithubRep[]>;

}
