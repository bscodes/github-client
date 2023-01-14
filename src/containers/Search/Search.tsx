import { useLazyQuery } from '@apollo/client';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_USERS } from '../../api/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  searchSelector,
  setError,
  setLoading,
  setSearchQuery,
  setSearchResult,
  setUserRepositories,
} from '../../redux/slices/features/search/searchSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/typedSelectors';

const Search = () => {
  const [getUsers, { loading, error, data: searchResult }] =
    useLazyQuery(SEARCH_USERS);

  const searchState = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchQuery } = searchState;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e?.target?.value));
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setUserRepositories(null));
    navigate('/');
    if (searchQuery.length) {
      getUsers({
        variables: {
          searchQuery,
        },
      });
    }
  };

  useEffect(() => {
    if (searchResult?.search?.edges) {
      dispatch(setSearchResult(searchResult?.search?.edges));
      dispatch(setSearchQuery(''));
    }

    return () => {
      dispatch(setSearchResult(null));
      dispatch(setUserRepositories(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult?.search?.edges]);

  useEffect(() => {
    dispatch(setLoading(loading));
    if (error) dispatch(setError(error));

    return () => {
      dispatch(setError(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  return (
    <SearchBar
      onInputChange={onInputChange}
      onSearch={onSearch}
      searchQuery={searchQuery}
    />
  );
};

export default Search;
