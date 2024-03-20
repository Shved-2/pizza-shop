import './scss/app.scss';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

import Error404 from './pages/Error404';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MyLayout from './layout/MyLayout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
