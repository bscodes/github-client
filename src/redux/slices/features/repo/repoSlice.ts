import { RootState } from '@/redux/store';
import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export interface IIssue {
  createdAt: string;
  number: number;
  title: string;
  author: {
    login: string;
    name: string;
  };
}

export interface RepoList {
  node: {
    id: string;
    description: string;
    forks: {
      totalCount: number;
    };
    name: string;
    primaryLanguage: {
      name: string;
    };
    stargazers: {
      totalCount: number;
    };
    url: string;
  };
}

export interface IRepoDetail {
  issues: {
    nodes: IIssue[] | null;
  };
  stargazers: {
    totalCount: number;
  };
  watchers: {
    totalCount: number;
  };
  id: string;
}

interface RepoState {
  repoDetail: IRepoDetail | null;
  repoList: RepoList[] | [];
}

type TRepoSlice = Slice<RepoState, SliceCaseReducers<RepoState>, 'repo'>;

const initialState: RepoState = {
  repoDetail: null,
  repoList: [],
};

export const repoSlice: TRepoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoDetail: (
      state: RepoState,
      action: PayloadAction<IRepoDetail | null>
    ) => {
      return {
        ...state,
        repoDetail: action.payload,
      };
    },
    setRepoList: (state: RepoState, action: PayloadAction<RepoList[] | []>) => {
      return {
        ...state,
        repoList: action.payload,
      };
    },
  },
});

export const { setRepoDetail, setRepoList } = repoSlice.actions;
export const repoReducerName = repoSlice.name;
export const repoReducer = repoSlice.reducer;
export const repoSelector = (state: RootState) => state[repoSlice.name];
export default repoSlice;
