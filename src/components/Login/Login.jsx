import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  return(
    <section id='login'>
      <div className='login__wrapper'>
        <div className='login__container'>
          <img src={process.env.PUBLIC_URL + '/assets/logo/logo-devlinks-large.svg'} alt='logo' />
          <div className='login__inner'>
            <div className='login__inner__header'>
              <h1>Login</h1>
              <p>Add your details below to get back into the app</p>
            </div>
            <div className='login__inner__form'>
              <form>
                <div className='login__inner__form__email'>
                  <p>Email address</p>
                  <div className='login__inner__form__input'>
                    <input
                    type='email'
                    placeholder='e.g. alex@email.com'
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-email.svg'}/>
                  </div>
                </div>
                <div className='login__inner__form__password'>
                  <p>Password</p>
                  <div className='login__inner__form__input'>
                    <input
                    type='password'
                    placeholder='Enter your password'
                    ></input>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-password.svg'}/>
                  </div>
                </div>
                <div className='login__inner__form__btn'>
                  <button>Login</button>
                </div>
              </form>
              <div className='login__inner__footer'>
                <p>Don't have an account?</p>
                <Link to={'/signup'}>Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login
