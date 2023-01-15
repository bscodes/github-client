import { RootState } from '@/redux/store';
import { ApolloError } from '@apollo/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchResult {
  node: {
    id: string;
    name: string | null;
    login: string | null;
    avatarUrl: string;
    repositories: {
      totalCount: number;
      edges: IUserRepositories[];
    };
    starredRepositories: {
      totalCount: number;
    };
  };
}

export interface IUserRepositories {
  node: {
    name: string | null;
    watchers: {
      totalCount: number;
    };
    stargazers: {
      totalCount: number;
    };
    id: string;
  };
}

export interface SearchState {
  searchResult: ISearchResult[] | null;
  searchQuery: string;
  loading: boolean;
  error: ApolloError | null;
  isSubmit: boolean;
  userRepositories: IUserRepositories[] | null;
  selectedUser: string | null;
}

const initialState: SearchState = {
  searchResult: null,
  searchQuery: '',
  loading: false,
  error: null,
  isSubmit: false,
  userRepositories: null,
  selectedUser: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsSubmit: (state: SearchState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSubmit: action.payload,
      };
    },
    setSearchResult: (
      state: SearchState,
      action: PayloadAction<ISearchResult[] | null>
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
    setLoading: (state: SearchState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError: (
      state: SearchState,
      action: PayloadAction<ApolloError | null>
    ) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    setUserRepositories: (
      state: SearchState,
      action: PayloadAction<IUserRepositories[] | null>
    ) => {
      return {
        ...state,
        userRepositories: action.payload,
      };
    },
    setSelectedUser: (
      state: SearchState,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        selectedUser: action.payload,
      };
    },
  },
});

export const {
  setSearchResult,
  setSearchQuery,
  setError,
  setLoading,
  setIsSubmit,
  setUserRepositories,
  setSelectedUser,
} = searchSlice.actions;
export const searchReducerName = searchSlice.name;
export const searchReducer = searchSlice.reducer;
export const searchSelector = (state: RootState) => state[searchSlice.name];
export default searchSlice;
