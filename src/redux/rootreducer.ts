import { repoReducer, repoReducerName } from './slices/features/repo/repoSlice';
import {
  searchReducer,
  searchReducerName,
} from './slices/features/search/searchSlice';

const rootReducer = {
  [searchReducerName]: searchReducer,
  [repoReducerName]: repoReducer,
};

export default rootReducer;
