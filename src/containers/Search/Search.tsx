import { AxiosResponse } from 'axios';
import { ChangeEvent, FormEvent } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  searchSelector,
  setSearchQuery,
  setSearchResult,
} from '../../redux/slices/features/search/searchSlice';
import { axiosInstance } from '../../utils/axiosInstance';

const Search = () => {
  const searchState = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  const { searchQuery } = searchState;

  const SEARCH_USERS: string = `
    {
      viewer {
        login
        name
      }
      search(query: "${searchQuery}", type: USER, first: 10) {
        edges {
          node {
            ... on User {
              id
              repositories {
                totalCount
              }
              starredRepositories {
                totalCount
              }
              name
              avatarUrl(size: 120)
            }
          }
        }
      } 
    }
  `;
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e?.target?.value));
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    axiosInstance
      .post('', { query: SEARCH_USERS })
      .then((result: AxiosResponse) => {
        if (result?.data?.data?.search?.edges)
          dispatch(setSearchResult(result?.data?.data?.search?.edges));
      });
  };

  return (
    <SearchBar
      onInputChange={onInputChange}
      onSearch={onSearch}
      searchQuery={searchQuery}
    />
  );
};

export default Search;
