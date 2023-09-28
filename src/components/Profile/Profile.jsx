import Navbar from '../Navbar/Navbar.jsx';
import './Profile.scss';

const Profile = () => {
  return(
    <section id='profile'>
      <Navbar />
      <div className='profile__wrapper'>
        <div className='profile__mockup'>
          <img src={process.env.PUBLIC_URL + '/assets/images/illustration-phone-mockup.svg'} alt='mobile phone mockup'/>
        </div>
        <div className='profile__info'>
          <div className='profile__info__container'>
            <div className='profile__info__header'>
              <h1>Profile Details</h1>
              <p>Add your details to create a personal touch to your profile.</p>
            </div>
            <div className='profile__info__inner'>
              <div className='profile__info__inner__photo'>
                <div className='profile__info__inner__photo__title'>
                  <p>Profile picture</p>
                </div >
                <div className='profile__info__inner__photo__details'>
                  <div className='profile__info__inner__photo__image__empty'>
                    <img src={process.env.PUBLIC_URL + 'assets/icons/icon-upload-image.svg'} alt='upload img icon'/>
                    <p>+ Upload Image</p>
                  </div>
                  <div className='profile__info__inner__photo__info'>
                    <p>Image must be below 1024x1024px.<br />Use PNG or JPG format.</p>
                  </div>
                </div>
              </div>
              <div className='profile__info__inner__details'>
                <div className='profile__info__inner__details__input'>
                  <p>First name*</p>
                  <input
                  type='text'
                  placeholder='e.g. John'
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Last name*</p>
                  <input
                  type='text'
                  placeholder='e.g. Appleseed'
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Email</p>
                  <input
                  type='email'
                  placeholder='e.g. email@example.com'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='profile__info__footer'>
            <button>Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile
