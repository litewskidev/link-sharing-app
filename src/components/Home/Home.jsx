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
        <h1>HOMEPAGE</h1>
        <Link to={'/login'} >Login</Link>
      </div>
    </section>
  )
};

export default Home;
