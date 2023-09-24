import Links from '../Links/Links';
import Login from '../Login/Login';
import Preview from '../Preview/Preview';
import Profile from '../Profile/Profile';
import Sign from '../Sign/Sign';
import './Main.scss';

const Main = () => {
  return(
    <section id='main' >
      <div className='main__wrapper'>
        <Login />
        <Sign />
        <Links />
        <Profile />
        <Preview />
      </div>
    </section>
  );
};

export default Main
