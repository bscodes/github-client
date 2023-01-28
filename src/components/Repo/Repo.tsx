import { FC } from 'react';

import type { RepoList } from '@/redux/slices/features/repo/repoSlice';

interface IRepoProps {
  repo: RepoList;
  onClick: (name: string | null) => void;
}

const Repo: FC<IRepoProps> = ({ repo, onClick }) => {
  const { name, stargazers, description, primaryLanguage, forks } = repo?.node;

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
          {stargazers.totalCount} Stars - {forks.totalCount} Forks
        </h4>
        <h4>{description} description</h4>
        <h4>{primaryLanguage?.name} primaryLanguage</h4>
      </div>
    </div>
  );
};

export default Repo;
