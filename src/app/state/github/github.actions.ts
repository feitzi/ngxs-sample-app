import {components} from '@octokit/openapi-types';

export class RepoSearchValueChanged {
  static readonly type = '[Github] Repo Search Value Changed';

  constructor(public searchValue: string) {
  }
}

export class SearchForRepos {
  static readonly type = '[Github] Search For Repos';

  constructor() {
  }
}


export class SearchForReposDebounced {
  static readonly type = '[Github] Search For Repos Debounced';

  constructor() {
  }
}

export class ReposFound {
  static readonly type = '[Github] Repos Found';

  constructor(public repoSearchResult: components['schemas']['repo-search-result-item'][]) {
  }
}


