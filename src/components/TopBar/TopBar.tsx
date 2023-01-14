import Search from '../../containers/Search/Search';
import Switcher from '../ColorThemeSwitcher/ColorThemeSwitcher';

const TopBar: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center my-4 px-4">
        <div className="mr-3">
          <h2 className="whitespace-nowrap text-2xl font-black my-0">
            GitHub Search
          </h2>
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
