import { FC } from 'react';
import RepoList from '../../containers/Repos/RepoList';
import UserList from '../../containers/User/UserList';

const Home: FC = () => {
  return (
    <div className="flex flex-col gap-3 px-32">
      <UserList />
      <hr />
      <RepoList />
    </div>
  );
};

export default Home;
