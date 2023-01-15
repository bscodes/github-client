import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Repo from '@/components/Repo/Repo';
import { useAppSelector } from '@/utils/hooks/typedSelectors';
import {
  IUserRepositories,
  searchSelector,
} from '@/redux/slices/features/search/searchSlice';

const RepoList: FC = () => {
  const searchState = useAppSelector(searchSelector);
  const navigate = useNavigate();
  const { userRepositories, selectedUser } = searchState;

  const handleRouter = (name: string | null) => {
    navigate(`/repo?owner=${selectedUser}&name=${name}`);
  };

  return (
    <>
      {userRepositories?.length ? (
        <>
          <h3 className="mb-2">Users Repositories</h3>
          {userRepositories.map((repo: IUserRepositories) => (
            <Repo repo={repo} onClick={handleRouter} key={repo?.node?.id} />
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RepoList;
