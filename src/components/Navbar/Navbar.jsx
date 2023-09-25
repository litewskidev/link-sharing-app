import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return(
    <section id='navbar'>
      <div className='navbar__wrapper'>
        <nav className='navbar__container'>
          <div className='navbar__logo'>
            <img className='navbar__logo__desktop' src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
            <img className='navbar__logo__mobile' src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-small.svg'} alt='logo' />
          </div>
          <div className='navbar__links__middle__container'>
            <NavLink to="/links" className='navbar__links'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-links-header.svg'} alt='links icon'/>
              <p className='navbar__links__mobile'>Links</p>
            </NavLink>
            <NavLink to="/profile" className='navbar__profile'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-profile-details-header.svg'} alt='profile details icon' />
              <p className='navbar__profile__mobile'>Profile Details</p>
            </NavLink>
          </div>
          <div className='navbar__preview' onClick={() => navigate('/preview')}>
            <p>Preview</p>
          </div>
          <div className='navbar__preview__mobile'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-preview-header.svg'} alt='preview icon' />
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar
