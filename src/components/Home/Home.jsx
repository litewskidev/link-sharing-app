import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
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
