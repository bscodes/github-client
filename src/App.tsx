import { Route, Routes } from 'react-router-dom';
import Search from './containers/Search/Search';
import Home from './pages/home/home';
import Repo from './pages/repo/repo';

const App = () => {
  return (
    <div className="App">
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo" element={<Repo />} />
      </Routes>
    </div>
  );
};

export default App;
