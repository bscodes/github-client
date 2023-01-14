import { Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/home/home';
import Repo from './pages/repo/repo';

const App: React.FC = () => {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo" element={<Repo />} />
      </Routes>
    </div>
  );
};

export default App;
