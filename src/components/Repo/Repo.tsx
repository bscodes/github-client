import { FC, useEffect, useState } from 'react';

import type { RepoList } from '@/redux/slices/features/repo/repoSlice';
import { Link } from 'react-router-dom';
import languageColors from '@/assets/data/languageColors.json';
import { GoStar } from 'react-icons/go';
import { TbGitFork } from 'react-icons/tb';

interface IRepoProps {
  repo: RepoList;
  repoDetailPageUrl: string;
}

interface LanguageColor {
  color: string | null;
  url: string;
}

interface LanguageColors {
  [language: string]: LanguageColor;
}

const colors: LanguageColors = languageColors;

const Repo: FC<IRepoProps> = ({ repo, repoDetailPageUrl }) => {
  const [languageColor, setLanguageColor] = useState<string | null>(null);
  const { name, stargazers, description, primaryLanguage, forks } = repo?.node;

  function getColor(languageName: string): string | null {
    if (colors[languageName]) {
      return colors[languageName].color;
    }
    return null;
  }

  useEffect(() => {
    const color = getColor(primaryLanguage?.name);
    if (primaryLanguage?.name) {
      setLanguageColor(color);
    }

    return () => {
      setLanguageColor(null);
    };
  }, [primaryLanguage]);

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="mr-auto">
        <Link
          to={repoDetailPageUrl}
          className="no-underline dark:underline text-blue-600 dark:text-blue-200"
        >
          <h3>{name}</h3>
        </Link>
      </div>
      <h4 className="text-sm font-thin text-gray-600 dark:text-gray-100">
        {description}
      </h4>

      <div className="flex gap-8">
        {primaryLanguage?.name && (
          <div className="flex items-center gap-1">
            <div
              className="rounded-full h-3 w-3"
              style={{
                background: languageColor ? languageColor : '#fff',
              }}
            />
            <h5 className="font-thin">{primaryLanguage?.name}</h5>
          </div>
        )}

        <div className="flex gap-2">
          <GoStar />
          <h5 className="font-thin  bg-gray-200 dark:bg-gray-800 px-2 rounded-lg">
            {stargazers?.totalCount}
          </h5>
        </div>
        <div className="flex gap-2">
          <TbGitFork />
          <h5 className="font-thin bg-gray-200 dark:bg-gray-800 px-2 rounded-lg">
            {forks.totalCount}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Repo;
