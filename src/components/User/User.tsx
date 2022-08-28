import { FC, MouseEvent } from 'react';
import defaultUserAvatar from '../../assets/images/defaultUserAvatar.png';

interface IUserProps {
  user: {
    id: string;
    name: string | null;
    avatarUrl: string;
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };
  };
}

const User: FC<IUserProps> = ({ user }) => {
  const { avatarUrl, id, name, repositories, starredRepositories } = user;

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
      key={id}
      className="flex justify-center items-center rounded-lg h-40 w-full my-4"
      onMouseOver={(event: MouseEvent<HTMLDivElement>) =>
        handleMouseOver(event, avatarUrl || defaultUserAvatar)
      }
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'black',
      }}
    >
      <div className="text-center text-white w-60 z-10">
        <h3>{name}</h3>
        <h5>
          {repositories?.totalCount} Repositories -{' '}
          {starredRepositories?.totalCount} Stars
        </h5>
      </div>
    </div>
  );
};

export default User;
