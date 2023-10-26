import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();

    //  GSAP
    const homeRef = useRef(null);
    useLayoutEffect(() => {
      const home = homeRef.current;
      gsap.fromTo(home, {opacity: 0, x: '-2%'}, {opacity: 1, x: 0, duration: .7, ease: 'sine.out'});
    }, []);

  //  USER
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if(userInfo) {
      navigate('/links');
    }
  }, [userInfo, navigate]);

  return(
    <section id='home'>
      <div className='home__wrapper' ref={homeRef}>
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
            <p>The only link you need to share your work.</p>
            <nav className='home__info__nav__btn'>
              <Link to={'/register'}>Get started</Link>
            </nav>
          </div>
          <div className='home__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/mockup_home.webp'} alt='phone mockup'/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
