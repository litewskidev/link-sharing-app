import Navbar from '../Navbar/Navbar.jsx';
import Links from '../Links/Links.jsx';
import Profile from '../Profile/Profile.jsx';
import Preview from '../Preview/Preview.jsx';
import './Main.scss';

const Main = () => {
  return(
    <section id='main' >
      <div className='main__wrapper'>
        <Navbar />
        <Links />
        <Profile />
        <Preview />
      </div>
    </section>
  );
};

export default Main
