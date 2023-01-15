import { FC } from 'react';
import Search from '@/containers/Search/Search';

const Home: FC = () => {
  return (
    <>
      <div className="flex container mx-auto">
        <div className="w-full md:w-1/2 mx-auto px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl text-center mb-6">
            <span className="text-transparent font-black bg-clip-text bg-gradient-to-r dark:from-blue-300 from-blue-500 dark:to-orange-400 to-orange-600">
              Explore
            </span>{' '}
            GitHub users and repositories
          </h1>
          <Search size="large" />
        </div>
      </div>
      <div className="pattern-bg" />
    </>
  );
};

export default Home;
