import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import {
  searchSelector,
  setIsSubmit,
  setSearchQuery,
} from '@/redux/slices/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/typedSelectors';

interface SearchContainerProps {
  size: 'large' | 'small';
}

const Search: React.FC<SearchContainerProps> = ({ size }) => {
  const searchState = useAppSelector(searchSelector);
  const { searchQuery } = searchState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e?.target?.value));
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setIsSubmit(true));
    navigate(`/search?q=${searchQuery}&type=users`);
  };

  return (
    <SearchBar
      onInputChange={onInputChange}
      onSearch={onSearch}
      searchQuery={searchQuery}
      size={size}
    />
  );
};

export default Search;
