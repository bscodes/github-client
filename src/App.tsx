import { Route, Routes } from 'react-router-dom';
import TopBar from './containers/TopBar/TopBar';
import Home from './pages/home/home';
import Repo from './pages/repo/repo';
import SearchPage from './pages/search/search';
import User from './pages/user/user';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-pink-500 sticky top-0 z-50"></div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/repo" element={<Repo />} />
        <Route path="/:user" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
