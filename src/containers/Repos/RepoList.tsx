import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Repo from '@/components/Repo/Repo';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_REPOSITORIES } from '@/api/api';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/typedSelectors';
import {
  type RepoList as IRepoList,
  repoSelector,
  setRepoList,
} from '@/redux/slices/features/repo/repoSlice';

const RepoList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getRepoList, { loading: l1, data }] = useLazyQuery(
    GET_USER_REPOSITORIES
  );
  const location = useLocation();
  const gitHubUserName = location.pathname.slice(1);
  const repoState = useAppSelector(repoSelector);

  const handleRouter = (name: string | null) => {
    navigate(`/repo?owner=${gitHubUserName}&name=${name}`);
  };

  useEffect(() => {
    if (gitHubUserName) {
      getRepoList({
        variables: {
          owner: gitHubUserName,
        },
      });
    }
  }, [gitHubUserName, getRepoList]);

  useEffect(() => {
    const repositories = data?.user?.repositories?.edges;

    if (data && repositories) {
      console.log({
        repositories,
      });
      dispatch(setRepoList(repositories));
    }

    return () => {
      dispatch(setRepoList([]));
    };
  }, [data, dispatch]);

  return (
    <>
      {!repoState.repoList?.length && l1 && <h3>Loading...</h3>}
      {repoState.repoList?.length ? (
        <>
          <h3 className="mb-2">Users Repositories</h3>
          {repoState.repoList.map((repo: IRepoList) => (
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
