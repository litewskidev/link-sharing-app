import Navbar from '../Navbar/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import './UserLayout.scss';

const UserLayout = () => {
  return(
    <section id='user-layout'>
      <Navbar />
      <Outlet />
    </section>
  );
};

export default UserLayout
