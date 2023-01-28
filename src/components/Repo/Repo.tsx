import { FC } from 'react';

import type { RepoList } from '@/redux/slices/features/repo/repoSlice';
import { Link } from 'react-router-dom';

interface IRepoProps {
  repo: RepoList;
  repoDetailPageUrl: string;
}

const Repo: FC<IRepoProps> = ({ repo, repoDetailPageUrl }) => {
  const { name, stargazers, description, primaryLanguage, forks } = repo?.node;

  return (
    <div className="flex hover:bg-yellow-50 px-3 rounded-lg">
      <div className="mr-auto">
        <Link to={repoDetailPageUrl} className="no-underline text-blue-600">
          <h3>{name}</h3>
        </Link>
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
