import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_USERS } from '@/api/api';
import {
  setError,
  setIsSubmit,
  setLoading,
  setSearchQuery,
  setSearchResult,
  setUserRepositories,
} from '@/redux/slices/features/search/searchSlice';
import { useAppDispatch } from '@/utils/hooks/typedSelectors';
import UserList from '../User/UserList';

const SearcResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [getUsers, { loading, error, data: searchResult }] =
    useLazyQuery(SEARCH_USERS);
  const dispatch = useAppDispatch();

  const query = searchParams.get('q');
  const type = searchParams.get('type');

  useEffect(() => {
    if (query && type) {
      dispatch(setSearchQuery(query));
      getUsers({
        variables: {
          searchQuery: query,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type]);

  useEffect(() => {
    if (searchResult?.search?.edges) {
      dispatch(setSearchResult(searchResult?.search?.edges));
      dispatch(setIsSubmit(false));
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
    <>
      <UserList />
    </>
  );
};

export default SearcResults;
