import './App.css';
import LoginPage from './pages/LoginPage'
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import Nav from './components/Nav';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path='main' element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;