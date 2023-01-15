import defaultUserAvatar from '@/assets/images/defaultUserAvatar.png';
import { IUserRepositories } from '@/redux/slices/features/search/searchSlice';
import { FC } from 'react';
import { GoRepo, GoStar } from 'react-icons/go';
import { Link } from 'react-router-dom';

interface IUserProps {
  user: {
    id: string;
    name: string | null;
    login: string | null;
    avatarUrl: string;
    repositories: {
      totalCount: number;
      edges: IUserRepositories[];
    };
    starredRepositories: {
      totalCount: number;
    };
  };
  onUserClick: (repositories: IUserRepositories[], name: string | null) => void;
}

const User: FC<IUserProps> = ({ user, onUserClick }) => {
  const {
    avatarUrl,
    name: displayName,
    login: userName,
    repositories,
    starredRepositories,
  } = user;

  return (
    <div
      onClick={() => onUserClick(repositories?.edges, userName)}
      className="flex flex-row gap-3"
    >
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="user avatar"
        className="h-10 w-10 rounded-full"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row flex-wrap gap-1">
          {displayName && (
            <Link to={`/${userName}`} className="no-underline">
              <h3 className="hover:underline hover:decoration-blue-500 text-blue-500 dark:hover:decoration-blue-200 dark:text-blue-200">
                {displayName}
              </h3>
            </Link>
          )}
          <Link to={`/${userName}`} className="no-underline">
            <h3 className="hover:underline hover:decoration-gray-500 text-gray-500 dark:hover:decoration-gray-50 dark:text-gray-50">
              @{userName}
            </h3>
          </Link>
        </div>

        <div className="flex flex-row  gap-2">
          <GoRepo />
          <h5 className="font-thin">Repositories</h5>
          <h5 className="font-thin bg-gray-200 px-2 rounded-lg">
            {repositories?.totalCount}
          </h5>
          <GoStar />
          <h5 className="font-thin">Stars</h5>
          <h5 className="font-thin bg-gray-200 px-2 rounded-lg">
            {starredRepositories?.totalCount}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default User;
