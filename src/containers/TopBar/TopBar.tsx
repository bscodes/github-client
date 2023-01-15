import { Link, useLocation } from 'react-router-dom';
import {
  setIsSubmit,
  setSearchQuery,
  setSearchResult,
  setSelectedUser,
  setUserRepositories,
} from '@/redux/slices/features/search/searchSlice';
import { useAppDispatch } from '@/utils/hooks/typedSelectors';
import Switcher from '@/components/ColorThemeSwitcher/ColorThemeSwitcher';
import Search from '../Search/Search';

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const onReturnHome: () => void = () => {
    dispatch(setSearchResult(null));
    dispatch(setUserRepositories(null));
    dispatch(setSearchQuery(''));
    dispatch(setSelectedUser(null));
    dispatch(setIsSubmit(false));
  };

  return (
    <div className="px-2 md:px-0">
      <div className="flex flex-row flex-wrap items-center justify-center mt-4 mb-16 px-4">
        <div className="mr-3 order-1">
          <Link
            to={'/'}
            className="font-black text-black dark:text-white no-underline"
            onClick={onReturnHome}
          >
            <h2 className="whitespace-nowrap text-2xl font-black my-0">
              GitHub Search
            </h2>
          </Link>
        </div>
        {!isMainPage && (
          <div className="w-full md:w-96 px-0 md:px-8 mt-8 md:mt-0 order-3 md:order-2 flex-grow md:flex-grow-0 flex-shrink-0 md:flex-shrink basis-full md:basis-auto">
            <Search size="small" />
          </div>
        )}
        <div className="ml-auto order-2 md:order-3">
          <Switcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
