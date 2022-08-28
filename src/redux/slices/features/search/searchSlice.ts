import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface ISearchResult {
  node: {
    id: string;
    name: string | null;
    avatarUrl: string;
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };
  };
}

export interface SearchState {
  searchResult: ISearchResult[] | null;
  searchQuery: string;
}

const initialState: SearchState = {
  searchResult: null,
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResult: (
      state: SearchState,
      action: PayloadAction<ISearchResult[]>
    ) => {
      return {
        ...state,
        searchResult: action.payload,
      };
    },
    setSearchQuery: (state: SearchState, action: PayloadAction<string>) => {
      return {
        ...state,
        searchQuery: action.payload,
      };
    },
  },
});

export const { setSearchResult, setSearchQuery } = searchSlice.actions;
export const searchReducerName = searchSlice.name;
export const searchReducer = searchSlice.reducer;
export const searchSelector = (state: RootState) => state[searchSlice.name];
export default searchSlice;
