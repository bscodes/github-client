import {
  searchReducer,
  searchReducerName,
} from './slices/features/search/searchSlice';

const rootReducer = {
  [searchReducerName]: searchReducer,
};

export default rootReducer;
