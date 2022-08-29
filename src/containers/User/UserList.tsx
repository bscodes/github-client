import { FC } from 'react';
import User from '../../components/User/User';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/typedSelectors';
import {
  ISearchResult,
  IUserRepositories,
  searchSelector,
  setSelectedUser,
  setUserRepositories,
} from '../../redux/slices/features/search/searchSlice';

const UserList: FC = () => {
  const searchState = useAppSelector(searchSelector);
  const { searchResult, loading, error } = searchState;
  const dispatch = useAppDispatch();

  const handleUserClick = (
    repositories: IUserRepositories[],
    name: string | null
  ) => {
    dispatch(setUserRepositories(repositories));
    dispatch(setSelectedUser(name));
  };

  return (
    <>
      {loading && <h3 className="text-center">Loading...</h3>}
      {error && <h3 className="text-center">{error?.message}</h3>}
      {!!searchResult?.length && (
        <>
          <h3 className="text-center">Results</h3>
          <h3>Users</h3>
          <div className="flex flex-row gap-4 overflow-x-scroll">
            {searchResult?.map((user: ISearchResult) => (
              <User
                user={user?.node}
                onUserClick={handleUserClick}
                key={user?.node?.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserList;
