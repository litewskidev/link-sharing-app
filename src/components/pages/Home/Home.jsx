import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/links');
    }
  }, [userInfo, navigate]);

  return(
    <section id='home'>
      <div className='home__wrapper'>
        <div className='home__logo'>
          <img src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
          <nav className='home__nav'>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Create</Link>
          </nav>
        </div>
        <div className='home__container'>
          <div className='home__info'>
            <h1>One for<br />everything</h1>
            <p>The only link you need to share your content.</p>
            <nav className='home__info__nav__btn'>
              <Link to={'/register'}>Get started</Link>
            </nav>
          </div>
          <div className='home__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/mockup_home.webp'}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
