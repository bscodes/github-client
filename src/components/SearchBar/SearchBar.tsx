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
    <form onSubmit={onSearch} className="mx-auto">
      <input
        id="user"
        type="text"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search users..."
      />
      <button type="submit" disabled={!searchQuery.length}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
