import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { FunctionComponent } from 'react';

const  MyLayout:FunctionComponent =()=> {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MyLayout;
