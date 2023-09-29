import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/slices/usersApiSlice.js';
import { setCredentials } from '../../redux/slices/authSlice.js';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/links');
    }
  }, [userInfo, navigate]);

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password
      }).unwrap();
      dispatch(setCredentials( {...res} ));
      navigate('/links');
      setEmail('');
      setPassword('');
      setInputError(false);
    }
    catch(err) {
      setInputError(err?.data?.message || err.error);
    }
  };

  return(
    <section id='login'>
      <div className='login__wrapper'>
        <div className='login__container'>
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
          </Link>
          <div className='login__inner'>
            <div className='login__inner__header'>
              <h1>Login</h1>
              <p>Add your details below to get back into the app</p>
            </div>
            <div className='login__inner__form'>
              <form onSubmit={submitHandler}>
                <div className='login__inner__form__email'>
                  <p>Email address</p>
                  <div className='login__inner__form__input'>
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
                <div className='login__inner__form__password'>
                  <p>Password</p>
                  <div className='login__inner__form__input'>
                    <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-password.svg'} alt='padlock icon' />
                  </div>
                </div>
                {inputError &&
                  <div className='login__input__error'>
                    <p>{inputError}</p>
                  </div>
                }
                <div className='login__inner__form__btn'>
                  <button type='submit'>Login</button>
                </div>
              </form>
              <div className='login__inner__footer'>
                <p>Don't have an account?</p>
                <Link to='/register'>Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login
