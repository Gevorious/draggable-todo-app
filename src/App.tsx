import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Details from './pages/Details';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
};

export default App;
