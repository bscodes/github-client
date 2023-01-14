import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import {
  setSearchQuery,
  setSearchResult,
  setUserRepositories,
} from '../../redux/slices/features/search/searchSlice';
import { useAppDispatch } from '../../utils/hooks/typedSelectors';
import Switcher from '../../components/ColorThemeSwitcher/ColorThemeSwitcher';

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const onReturnHome: () => void = () => {
    dispatch(setSearchResult(null));
    dispatch(setUserRepositories(null));
    dispatch(setSearchQuery(''));
  };

  return (
    <>
      <div className="flex items-center justify-center my-4 px-4">
        <div className="mr-3">
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
        <div className="ml-auto">
          <Switcher />
        </div>
      </div>
      <div className="w-full md:w-1/2 mx-auto">
        <Search />
      </div>
    </>
  );
};

export default TopBar;
