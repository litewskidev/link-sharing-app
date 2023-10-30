import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useLayoutEffect } from 'react';
import { useUpdateMutation } from '../../../redux/slices/usersApiSlice.js';
import { setCredentials } from '../../../redux/slices/authSlice.js';
import { gsap } from 'gsap';
import Navbar from '../../elements/Navbar/Navbar.jsx';
import UserLink from '../../elements/UserLink/UserLink.jsx';
import Loading from '../../elements/Loading/Loading.jsx';
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();

  //  GSAP
  const profileRef = useRef(null);
  useLayoutEffect(() => {
    const profile = profileRef.current;
    gsap.fromTo(profile, {opacity: 0, x: '-2%'}, {opacity: 1, x: 0, duration: .5, ease: 'sine.out'});
  }, []);

  //  USER
  const { userInfo } = useSelector((state) => state.auth);
  const [update, { isLoading }] = useUpdateMutation();

  //  FORM
  const [name, setName] = useState(userInfo.name);
  const [surname, setSurname] = useState(userInfo.surname);
  const [displayEmail, setDisplayEmail] = useState(userInfo.displayEmail);
  const [inputError, setInputError] = useState(false);

  //  IMAGE
  let profilePicture = process.env.PUBLIC_URL + 'assets/icons/icon-cloud.svg';
  if(userInfo.image !== undefined) {
    profilePicture = process.env.PUBLIC_URL + `assets/uploads/${userInfo.image}`;
  }

  //  LINKS
  let linksArray = [];
  if(userInfo.links !== undefined) {
    linksArray = JSON.parse(userInfo.links);
  }

  //  HANDLERS
  const modalSaveRef = useRef(null);
  const saveHandler = async() => {
    const modal = modalSaveRef.current;
    try {
      const res = await update({
        id: userInfo.id,
        name,
        surname,
        displayEmail
      }).unwrap();
      dispatch(setCredentials( {...res} ));
      modal.classList.add('show');
      setTimeout(() => {
        modal.classList.remove('show');
      }, 3500);
    }
    catch(err) {
      console.log(err);
    }
  };

  const modalImageRef = useRef(null);
  const imageHandler = async(e) => {
    const modal = modalImageRef.current;
    const formData = new FormData();
    formData.append('id', userInfo.id);
    formData.append('image', e.target.files[0]);
    formData.append('displayEmail', displayEmail);
    try {
      const res = await update(
        formData
      ).unwrap();
    dispatch(setCredentials( {...res} ));
    setInputError(false);
    modal.classList.add('show');
    setTimeout(() => {
      modal.classList.remove('show');
    }, 3500);
    }
    catch(err) {
      setInputError(err?.data?.message || err.error);
    }
  };

  return(
    <section id='profile'>
      <Navbar />
      <div className='profile__wrapper' ref={profileRef}>
        <div className='profile__mockup'>
          <div className='profile__mockup__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/illustration-phone-mockup.svg'} alt='mobile phone mockup'/>
            <div className='profile__mockup__image__data'>
              <div className='profile__mockup__image__data__image'>
                <img src={profilePicture} alt='avatar'/>
              </div>
              <div className='profile__mockup__image__data__details'>
                <h2>{name} {surname}</h2>
                <p>{displayEmail}</p>
              </div>
            </div>
            <div className='profile__mockup__image__links'>
              {linksArray.splice(0, 5).map((link, index) => (
                <UserLink link={link.link} id={link.id} color={link.background} key={index} />
              ))}
            </div>
          </div>
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
                  <div className='profile__info__inner__photo__image'>
                    <form className='profile__info__inner__photo__image__button' encType='multipart/form-data'>
                      <label htmlFor="image">
                        <img src={profilePicture} alt='avatar' />
                      </label>
                      <input
                        id='image'
                        name='image'
                        type='file'
                        onChange={imageHandler}
                      />
                    </form>
                  </div>
                </div>
                <div className='profile__info__inner__photo__info'>
                    {inputError &&
                      <div className='profile__info__file__error'>
                        <img src={process.env.PUBLIC_URL + '/assets/icons/icon-error.svg'} alt='error icon'/>
                        <p>{inputError}</p>
                      </div>
                    }
                    <p>Click to change.<br />Use PNG or JPG format.</p>
                  </div>
              </div>
              <div className='profile__info__inner__details'>
                <div className='profile__info__inner__details__input'>
                  <p>First name*</p>
                  <input
                  type='text'
                  placeholder='e.g. John'
                  value={name ?? ''}
                  onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Last name*</p>
                  <input
                  type='text'
                  placeholder='e.g. Appleseed'
                  value={surname ?? ''}
                  onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Email</p>
                  <input
                  type='email'
                  placeholder='e.g. email@example.com'
                  value={displayEmail ?? ''}
                  onChange={(e) => setDisplayEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='profile__info__footer'>
            <button onClick={saveHandler}>Save</button>
          </div>
        </div>
        <div className='profile__modal' ref={modalSaveRef}>
          <div className='profile__modal__container'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-changes-saved.svg'} alt='saved icon'/>
            <p>Your changes have been successfully saved!</p>
          </div>
        </div>
        <div className='profile__modal' ref={modalImageRef}>
          <div className='profile__modal__container'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-upload-image.svg'} alt='img icon'/>
            <p>Your image have been successfully changed!</p>
          </div>
        </div>
        {isLoading &&
          <Loading />
        }
      </div>
    </section>
  );
};

export default Profile;
