import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detailed from './components/Detailed/Detailed';
import UserList from './components/UserList';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/:id' element={<Detailed />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
