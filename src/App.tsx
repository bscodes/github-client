import { Route, Routes } from 'react-router-dom';
import Switcher from './components/ColorThemeSwitcher/ColorThemeSwitcher';
import Search from './containers/Search/Search';
import Home from './pages/home/home';
import Repo from './pages/repo/repo';

const App: React.FC = () => {
  return (
    <div className="App">
      <Search />
      <Switcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo" element={<Repo />} />
      </Routes>
    </div>
  );
};

export default App;
