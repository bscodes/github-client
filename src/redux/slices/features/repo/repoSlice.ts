import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface IIssue {
  createdAt: string;
  number: number;
  title: string;
  author: {
    login: string;
    name: string;
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
}

type TRepoSlice = Slice<RepoState, SliceCaseReducers<RepoState>, 'repo'>;

const initialState: RepoState = {
  repoDetail: null,
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
  },
});

export const { setRepoDetail } = repoSlice.actions;
export const repoReducerName = repoSlice.name;
export const repoReducer = repoSlice.reducer;
export const repoSelector = (state: RootState) => state[repoSlice.name];
export default repoSlice;
