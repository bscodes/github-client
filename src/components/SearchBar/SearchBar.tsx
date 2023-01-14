import React, { ChangeEvent, FC, FormEvent } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

interface ISearchBarProps {
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<ISearchBarProps> = ({
  onSearch,
  searchQuery,
  onInputChange,
}) => {
  return (
    <form onSubmit={onSearch} className="flex relative">
      <div className="absolute md:top-3 top-5 left-3 scale-50 h-4">
        <BiSearchAlt color="#717079" className="text-2xl md:text-base" />
      </div>
      <input
        id="user"
        type="text"
        className="w-full h-14 md:h-8 pl-12 md:pl-8 pr-2 rounded-2xl md:rounded-xl border-solid dark:border-lightdark dark:bg-lightdark text-2xl md:text-base dark:text-white"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search"
      />
    </form>
  );
};

export default SearchBar;
