import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, useEffect, useState } from 'react';
import { CREATE_ISSUE, GET_REPO } from '../../api/api';
import Issue from '../../components/Issue/Issue';
import Modal from 'react-modal';
import {
  IIssue,
  repoSelector,
  setRepoDetail,
} from '../../redux/slices/features/repo/repoSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/typedSelectors';
import useQuery from '../../utils/hooks/useQuery';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const RepoDetail = () => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [issueTitle, setIssueTitle] = useState<string>('');
  const [issueBody, setIssueBody] = useState<string>('');

  const [getRepo, { loading: l1, data: repo, refetch }] =
    useLazyQuery(GET_REPO);
  const [createIssue, { data: createdIssue, loading: l2 }] =
    useMutation(CREATE_ISSUE);

  const repoState = useAppSelector(repoSelector);
  const dispatch = useAppDispatch();
  const query = useQuery();

  const owner: string | null = query.get('owner');
  const name: string | null = query.get('name');

  const handleCreateIssue = () => {
    if (repoState.repoDetail?.id)
      createIssue({
        variables: {
          repositoryId: repoState.repoDetail?.id,
          title: issueTitle,
          body: issueBody,
        },
      });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsCreateOpen(false);
    setIssueTitle('');
    setIssueBody('');
  };
  const handleOpenModal = () => setIsCreateOpen(true);

  useEffect(() => {
    if (owner && name) {
      getRepo({
        variables: {
          owner,
          name,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, name]);

  useEffect(() => {
    if (createdIssue) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdIssue]);

  useEffect(() => {
    if (repo?.repositoryOwner && repo?.repositoryOwner?.repository) {
      dispatch(setRepoDetail(repo?.repositoryOwner?.repository));
    }

    return () => {
      dispatch(setRepoDetail(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo?.repositoryOwner?.repository]);

  return (
    <>
      {l1 && <h3 className="text-center">Loading...</h3>}
      <div className="flex flex-col px-32 mt-10">
        <div className="flex flex-row mb-7">
          <h2 className="mr-auto">{name}</h2>
          <h4 className="ml-auto">
            {repoState.repoDetail?.stargazers.totalCount} Stars -{' '}
            {repoState.repoDetail?.watchers.totalCount} Watching
          </h4>
        </div>
        <div>
          <div className="flex flex-row items-center">
            <h2 className="mr-auto">Open Issues</h2>
            <button
              className="ml-auto cursor-pointer h-8 w-44 bg-orange-300 hover:bg-orange-400 border-none rounded-sm"
              disabled={l2}
              onClick={handleOpenModal}
            >
              Create Issue
            </button>
          </div>
          <hr />
          {repoState?.repoDetail?.issues?.nodes &&
            repoState?.repoDetail?.issues?.nodes?.map((issue: IIssue) => (
              <Issue issue={issue} />
            ))}
        </div>
      </div>
      <Modal
        isOpen={isCreateOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div className="p-2 flex flex-col">
          {l2 && <h3 className="text-center">Creating...</h3>}
          <h3 className="m-0 mb-4">Create New Issue</h3>
          <form onSubmit={handleCreateIssue}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="title"
                id="title"
                className="border-black border py-2 px-1"
                placeholder="Title"
                value={issueTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIssueTitle(e.target.value)
                }
                required
              />
              <textarea
                required
                name="issueBody"
                id="issueBody"
                className="border-black border py-2 px-1"
                placeholder="Description"
                cols={30}
                rows={10}
                value={issueBody}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setIssueBody(e.target.value)
                }
              />
              <div className="flex flex-row gap-2 ml-auto mt-5">
                <button
                  className="cursor-pointer h-8 w-20 bg-red-500 hover:bg-orange-400 border-none rounded-sm"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer h-8 w-20 bg-orange-300 hover:bg-orange-400 border-none rounded-sm"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RepoDetail;
