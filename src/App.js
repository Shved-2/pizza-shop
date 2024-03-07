import './scss/app.scss';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

import Error404 from './pages/Error404';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { useState } from 'react';
import { createContext } from 'react';
export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
