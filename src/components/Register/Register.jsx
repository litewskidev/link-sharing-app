import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice.js';
import { useRegisterMutation } from '../../redux/slices/usersApiSlice.js';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/links');
    }
  }, [userInfo, navigate]);

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
    <section id='sign'>
      <div className='sign__wrapper'>
        <div className='sign__container'>
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
          </Link>
          <div className='sign__inner'>
            <div className='sign__inner__header'>
              <h1>Create account</h1>
              <p>Let's get you started sharing your links!</p>
            </div>
            <div className='sign__inner__form'>
              <form onSubmit={submitHandler}>
                <div className='sign__inner__form__email'>
                  <p>Email address</p>
                  <div className='sign__inner__form__input'>
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
                <div className='sign__inner__form__password'>
                  <p>Create password</p>
                  <div className='sign__inner__form__input'>
                    <input
                    type='password'
                    placeholder='At least 8 characters'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-password.svg'} alt='padlock icon' />
                  </div>
                </div>
                <div className='sign__inner__form__password'>
                  <p>Confirm password</p>
                  <div className='sign__inner__form__input'>
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
                  <div className='sign__inner__form__register__error'>
                    <p>{registerError}</p>
                  </div>
                }
                <p className='sign__inner__form__rule'>Password must contain at least 8 characters</p>
                <div className='sign__inner__form__btn'>
                  <button>Create new account</button>
                </div>
              </form>
              <div className='sign__inner__footer'>
                <p>Already have an account?</p>
                <Link to='/login'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
