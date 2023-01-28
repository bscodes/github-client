import { GET_USER_REPOSITORIES } from '@/api/api';
import Loading from '@/components/Loading/Loading';
import Repo from '@/components/Repo/Repo';
import {
  repoSelector,
  setRepoList,
  type RepoList as IRepoList,
} from '@/redux/slices/features/repo/repoSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/typedSelectors';
import { useLazyQuery } from '@apollo/client';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RepoList: FC = () => {
  const dispatch = useAppDispatch();
  const [getRepoList, { loading: l1, data, error }] = useLazyQuery(
    GET_USER_REPOSITORIES
  );
  const location = useLocation();
  const gitHubUserName = location.pathname.slice(1);
  const repoState = useAppSelector(repoSelector);

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
      dispatch(setRepoList(repositories));
    }

    return () => {
      dispatch(setRepoList([]));
    };
  }, [data, dispatch]);

  return (
    <div className="mx-auto px-6 md:px-10">
      <Loading loading={!repoState.repoList?.length && l1} />
      {error && <h3 className="text-center">{error?.message}</h3>}
      {!!repoState.repoList?.length && !l1 && (
        <>
          <h3 className="font-thin mb-9">{gitHubUserName}'s Repositories</h3>
          <hr className="w-full border-gray-400 dark:border-gray-800 opacity-10 dark:opacity-30 mb-8" />

          {repoState.repoList.map((repo: IRepoList) => (
            <Repo
              repo={repo}
              repoDetailPageUrl={`/repo?owner=${gitHubUserName}&name=${repo?.node?.id}`}
              key={repo?.node?.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RepoList;
