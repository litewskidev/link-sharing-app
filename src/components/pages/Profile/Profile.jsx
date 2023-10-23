import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useUpdateMutation } from '../../../redux/slices/usersApiSlice.js';
import { setCredentials } from '../../../redux/slices/authSlice.js';
import Navbar from '../../elements/Navbar/Navbar.jsx';
import UserLink from '../../elements/UserLink/UserLink.jsx';
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo.name);
  const [surname, setSurname] = useState(userInfo.surname);
  const [displayEmail, setDisplayEmail] = useState(userInfo.displayEmail);

  // eslint-disable-next-line no-unused-vars
  const [update, { isLoading }] = useUpdateMutation();

  let profilePicture = process.env.PUBLIC_URL + 'assets/icons/icon-cloud.svg';
  let pictureButton = '+ Upload Image';
  let pictureButtonColor = 'rgb(99, 60, 255)';
  let linksArray = [];

  if(userInfo.image !== undefined) {
    profilePicture = process.env.PUBLIC_URL + `assets/uploads/${userInfo.image}`;
    pictureButton = '+ Change Image';
    pictureButtonColor = 'rgb(255, 255, 255)';
  }
  if(userInfo.links !== undefined) {
    linksArray = JSON.parse(userInfo.links);
  }

  const saveHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await update({
        id: userInfo.id,
        name,
        surname,
        displayEmail
      }).unwrap();
      dispatch(setCredentials( {...res} ));
    }
    catch(err) {
      console.log(err);
    }
  };

  const imageHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', userInfo.id);
    formData.append('image', e.target.files[0]);
    formData.append('displayEmail', displayEmail);

    try {
      const res = await update(
        formData
      ).unwrap();
    dispatch(setCredentials( {...res} ));
    }
    catch(err) {
      console.log(err);
    }
  };

  return(
    <section id='profile'>
      <Navbar />
      <div className='profile__wrapper'>
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
              {linksArray.splice(0, 5).map(link => (
                <UserLink link={link.link} id={link.id} color={link.background} key={link.id} />
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
                      <input style={{color: pictureButtonColor}}
                        id='image'
                        name='image'
                        type='file'
                        onChange={imageHandler}
                      />
                    </form>
                  </div>
                </div>
                <div className='profile__info__inner__photo__info'>
                    <p>Image must be below 1024x1024px.<br />Use PNG or JPG format.</p>
                  </div>
              </div>
              <div className='profile__info__inner__details'>
                <div className='profile__info__inner__details__input'>
                  <p>First name*</p>
                  <input
                  type='text'
                  placeholder='e.g. John'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Last name*</p>
                  <input
                  type='text'
                  placeholder='e.g. Appleseed'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className='profile__info__inner__details__input'>
                  <p>Email</p>
                  <input
                  type='email'
                  placeholder='e.g. email@example.com'
                  value={displayEmail}
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
      </div>
    </section>
  );
};

export default Profile;
