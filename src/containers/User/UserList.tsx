import { FC } from 'react';
import User from '@/components/User/User';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/typedSelectors';
import {
  ISearchResult,
  IUserRepositories,
  searchSelector,
  setSelectedUser,
  setUserRepositories,
} from '@/redux/slices/features/search/searchSlice';
import Loading from '@/components/Loading/Loading';
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine';

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
    <div className="mx-auto px-6 md:px-10">
      <Loading loading={loading} />
      {error && <h3 className="text-center">{error?.message}</h3>}
      {!!searchResult?.length && !loading && (
        <>
          <h3 className="font-thin mb-9">{searchResult?.length} users</h3>
          <hr className="w-full border-gray-400 dark:border-gray-800 opacity-10 dark:opacity-30 mb-8" />
          <div className="flex flex-col items-start gap-4 mb-8">
            {searchResult?.map((user: ISearchResult, index: number, arr) => (
              <>
                <User
                  user={user?.node}
                  onUserClick={handleUserClick}
                  key={user?.node?.id}
                />
                <HorizontalLine index={index} arr={arr} />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
