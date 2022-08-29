import { FC, MouseEvent } from 'react';
import defaultUserAvatar from '../../assets/images/defaultUserAvatar.png';
import { IUserRepositories } from '../../redux/slices/features/search/searchSlice';

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

  const handleMouseOver = (
    event: MouseEvent<HTMLDivElement>,
    imgSrc: string
  ) => {
    const box: HTMLDivElement = event.currentTarget;
    box.style.backgroundImage = `url(${imgSrc})`;
    box.style.backgroundRepeat = 'no-repeat';
    box.style.backgroundSize = 'cover';
    box.style.backgroundPosition = 'center';
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
    box.style.background = 'black';
  };

  return (
    <div
      onClick={() => onUserClick(repositories?.edges, userName)}
      className="flex justify-center items-center rounded-lg h-40 w-full my-4 cursor-pointer"
      onMouseOver={(event: MouseEvent<HTMLDivElement>) =>
        handleMouseOver(event, avatarUrl || defaultUserAvatar)
      }
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'black',
      }}
    >
      <div className="text-center text-white w-60 z-10">
        <h3>{displayName || userName}</h3>
        <h5>
          {repositories?.totalCount} Repositories -{' '}
          {starredRepositories?.totalCount} Stars
        </h5>
      </div>
    </div>
  );
};

export default User;
