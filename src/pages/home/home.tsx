import { FC } from 'react';
import User from '../../components/User/User';
import Search from '../../containers/Search/Search';
import { useAppSelector } from '../../hooks';
import {
  ISearchResult,
  searchSelector,
} from '../../redux/slices/features/search/searchSlice';

const Home: FC = () => {
  const searchState = useAppSelector(searchSelector);
  const { searchResult } = searchState;
  return (
    <div className="flex flex-col gap-3">
      <Search />
      {!!searchResult?.length && (
        <>
          <h3 className="text-center">Results</h3>
          <h3>Users</h3>
          <div className="flex flex-row gap-4 overflow-x-scroll">
            {searchResult?.map((user: ISearchResult) => (
              <User user={user?.node} />
            ))}
          </div>
          <h3>Users Repositories</h3>
        </>
      )}
    </div>
  );
};

export default Home;
