import React, { ChangeEvent, FC, FormEvent } from 'react';

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
    <form onSubmit={onSearch} className="mx-auto w-1/3 flex">
      <input
        id="user"
        type="text"
        className="w-full h-8 px-2 rounded-none border-black border"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search users..."
      />
      <button
        type="submit"
        className="bg-sky-500 border-none px-3 h-9 text-white cursor-pointer"
        disabled={!searchQuery.length}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
