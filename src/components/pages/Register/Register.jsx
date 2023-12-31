import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../redux/slices/authSlice.js';
import { useRegisterMutation } from '../../../redux/slices/usersApiSlice.js';
import { gsap } from 'gsap';
import Loading from '../../elements/Loading/Loading.jsx';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  GSAP
  const registerRef = useRef(null);
  useLayoutEffect(() => {
    const register = registerRef.current;
    gsap.fromTo(register, {opacity: 0, x: '-2%'}, {opacity: 1, x: 0, duration: .5, ease: 'sine.out'});
  }, []);

  //  USER
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if(userInfo) {
      navigate('/links');
    }
  }, [userInfo, navigate]);
  const [register, { isLoading }] = useRegisterMutation();

  //  FORM
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);

  //  HANDLER
  const submitHandler = async(e) => {
    e.preventDefault();
    if(password !== conPassword) {
      setRegisterError('Passwords do not match.');
    }
    else {
      try {
        const res = await register({
          email,
          password
        }).unwrap();
        dispatch(setCredentials( {...res} ));
        navigate('/links');
        setEmail('');
        setPassword('');
        setConPassword('');
        setRegisterError(false);
      }
      catch(err) {
        setRegisterError(err?.data?.message || err.error);
      }
    }
  };

  return(
    <section id='register'>
      <div className='register__wrapper'>
        <div className='register__container'>
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
          </Link>
          <div className='register__inner' ref={registerRef}>
            <div className='register__inner__header'>
              <h1>Create account</h1>
              <p>Let's get you started sharing your links!</p>
            </div>
            <div className='register__inner__form'>
              <form onSubmit={submitHandler}>
                <div className='register__inner__form__email'>
                  <p>Email address</p>
                  <div className='register__inner__form__input'>
                    <input
                    type='email'
                    placeholder='e.g. alex@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-email.svg'} alt='email icon' />
                  </div>
                </div>
                <div className='register__inner__form__password'>
                  <p>Create password</p>
                  <div className='register__inner__form__input'>
                    <input
                    type='password'
                    placeholder='At least 8 characters'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern='[A-Za-z0-9]{8,99}'
                    required
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-password.svg'} alt='padlock icon' />
                  </div>
                </div>
                <div className='register__inner__form__password'>
                  <p>Confirm password</p>
                  <div className='register__inner__form__input'>
                    <input
                    type='password'
                    placeholder='At least 8 characters'
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-password.svg'} alt='padlock icon' />
                  </div>
                </div>
                {registerError &&
                  <div className='register__inner__form__register__error'>
                    <p>{registerError}</p>
                  </div>
                }
                <p className='register__inner__form__rule'>Password must contain at least 8 characters</p>
                <div className='register__inner__form__btn'>
                  <button>Create new account</button>
                </div>
              </form>
              <div className='register__inner__footer'>
                <p>Already have an account?</p>
                <Link to='/login'>Login</Link>
              </div>
            </div>
          </div>
        </div>
        {isLoading &&
          <Loading />
        }
      </div>
    </section>
  );
};

export default Register;
