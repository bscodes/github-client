import { FC } from 'react';
import { IUserRepositories } from '@/redux/slices/features/search/searchSlice';

interface IRepoProps {
  repo: IUserRepositories;
  onClick: (name: string | null) => void;
}

const Repo: FC<IRepoProps> = ({ repo, onClick }) => {
  const { name, stargazers, watchers } = repo?.node;

  return (
    <div
      className="flex cursor-pointer hover:bg-yellow-50 px-3 rounded-lg"
      onClick={() => onClick(name)}
    >
      <div className="mr-auto">
        <h3>{name}</h3>
      </div>
      <div className="ml-auto">
        <h4>
          {stargazers.totalCount} Stars - {watchers.totalCount} Watching
        </h4>
      </div>
    </div>
  );
};

export default Repo;
