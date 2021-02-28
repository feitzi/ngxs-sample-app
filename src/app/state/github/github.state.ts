import {Injectable} from '@angular/core';
import {Action, Actions, ofActionDispatched, Selector, State, StateContext, Store} from '@ngxs/store';
import {RepoSearchValueChanged, ReposFound, SearchForRepos, SearchForReposDebounced} from './github.actions';
import {auditTime, catchError, debounce, debounceTime, map, switchMap} from 'rxjs/operators';
import {EMPTY, from, interval, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Octokit} from '@octokit/rest';
import {components} from '@octokit/openapi-types';
import * as _ from 'lodash';

export interface IGithubRep {
  name: string;
  owner: string;
  lastPublish: string;
}

export interface GithubStateModel {
  searchInput: string;
  searchResult: IGithubRep[];
}

@State<GithubStateModel>({
  name: 'Github',
  defaults: {
    searchInput: 'abc',
    searchResult: []
  }
})
@Injectable()
export class GithubState {

  constructor(private httpClient: HttpClient, private actions$: Actions, private store: Store) {

    actions$.pipe(
      ofActionDispatched(SearchForReposDebounced),
      debounceTime(450),
      switchMap(() => store.dispatch(new SearchForRepos()))
    ).subscribe();

    interval(20000).pipe(
      switchMap(() => this.store.dispatch(new SearchForRepos()))
    ).subscribe();
  }


  @Selector([GithubState])
  static searchValue(state: GithubStateModel): string {
    return state.searchInput;
  }


  @Selector([GithubState])
  static repositories(state: GithubStateModel): IGithubRep[] {
    return state.searchResult;
  }

  @Action(RepoSearchValueChanged)
  public searchValueChanged(state: StateContext<GithubStateModel>, action: RepoSearchValueChanged) {
    state.patchState({
      searchInput: action.searchValue
    });

    return state.dispatch(new SearchForReposDebounced());
  }

  @Action(SearchForRepos, {cancelUncompleted: true})
  public searchForRepos(ctx: StateContext<GithubStateModel>, action: SearchForRepos) {

    return this.httpClient.get<any>('https://api.github.com/search/repositories', {
      params: {
        q: ctx.getState().searchInput
      }
    }).pipe(
      switchMap(result => ctx.dispatch(new ReposFound(result.items))),
      catchError((err) => {
        console.error('During search for repos an error occurred', err);
        return EMPTY;
      })
    );

  }

  @Action(ReposFound)
  public reposFound(ctx: StateContext<GithubStateModel>, action: ReposFound) {
    ctx.patchState({
      searchResult: []
    });

    const githubRepoItems = _(action.repoSearchResult).map(resultItem => {
      return {
        name: resultItem.name,
        owner: resultItem.owner.login,
        lastPublish: resultItem.pushed_at
      } as IGithubRep;
    }).value();

    ctx.patchState({
      searchResult: githubRepoItems
    });
  }

}
