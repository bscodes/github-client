import moment from 'moment';
import { FC } from 'react';
import { IIssue } from '../../redux/slices/features/repo/repoSlice';

interface IIssueProps {
  issue: IIssue;
}

const Issue: FC<IIssueProps> = ({ issue }) => {
  return (
    <>
      <div className="flex flex-col" key={issue?.author?.login}>
        <h3 className="m-0 mt-2">{issue?.title}</h3>
        <h4 className="m-0 mb-2 opacity-50">
          #{issue?.number} opened {moment(issue?.createdAt).fromNow()} by{' '}
          {issue?.author?.name || issue?.author?.login}
        </h4>
      </div>
      <hr />
    </>
  );
};

export default Issue;
