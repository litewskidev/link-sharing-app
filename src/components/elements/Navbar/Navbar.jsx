import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../redux/slices/usersApiSlice.js';
import { clearCredentials } from '../../../redux/slices/authSlice.js';
import './Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  LOGOUT
  const [logout] = useLogoutMutation();

  //  HANDLER
  const logoutHandler = async(e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    }
    catch(err) {
      console.log(err);
    }
  };

  return(
    <section id='navbar'>
      <div className='navbar__wrapper'>
        <nav className='navbar__container'>
          <div className='navbar__logo'>
            <img className='navbar__logo__desktop' src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
            <img className='navbar__logo__mobile' src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-small.svg'} alt='logo' />
          </div>
          <div className='navbar__links__middle__container'>
            <NavLink to='/links' className='navbar__links'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-links-header.svg'} alt='links icon'/>
              <p className='navbar__links__mobile'>Links</p>
            </NavLink>
            <NavLink to='/profile' className='navbar__profile'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-profile-details-header.svg'} alt='profile details icon' />
              <p className='navbar__profile__mobile'>Profile Details</p>
            </NavLink>
          </div>
          <div className='navbar__corner__container'>
            <div className='navbar__logout' onClick={logoutHandler}>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-logout.svg'} alt='logout icon'/>
            </div>
            <Link to='/preview' className='navbar__preview'>
              <p>Preview</p>
            </Link>
            <Link to='/preview' className='navbar__preview__mobile'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-preview-header.svg'} alt='preview icon' />
            </Link>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
