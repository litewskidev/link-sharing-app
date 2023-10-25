import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useUpdateMutation } from '../../../redux/slices/usersApiSlice.js';
import { setCredentials } from '../../../redux/slices/authSlice.js';
import Navbar from '../../elements/Navbar/Navbar.jsx';
import './Links.scss';

const Links = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [linksArray, setLinksArray] = useState([]);

  const platforms = [
    {id: 'GitHub', color: '#1A1A1A'}, {id: 'Frontend Mentor', color: '#D9D9D9'}, {id: 'Twitter', color: '#43B7E9'}, {id: 'LinkedIn', color: '#2D68FF'}, {id: 'YouTube', color: '#EE3939'}, {id: 'Facebook', color: '#2442AC'}, {id: 'Twitch', color: '#EE3FC8'}, {id: 'Dev.to', color: '#333333'}, {id: 'Codewars', color: '#8A1A50'}, {id: 'freeCodeCamp', color: '#302267'}, {id: 'GitLab', color: '#EB4925'}, {id: 'Hashnode', color: '#0330D1'}, {id: 'Stack Overflow', color: '#EC7100'}
  ];

  // eslint-disable-next-line no-unused-vars
  const [update, { isLoading }] = useUpdateMutation();

  useEffect(() => {
    if(userInfo.links) {
      setLinksArray(JSON.parse(userInfo.links));
    }
  }, [userInfo.links]);

  const dropdownHandler = (index) => {
    const dropdown = document.querySelector(`#platform-dropdown-${index}`);
    dropdown.classList.toggle('show');
  };

  const addLinkHandler = () => {
    setLinksArray([
      ...linksArray,
      {
        id: 'GitHub',
        background: '#1A1A1A',
        link: ''
      }
    ]);
  };

  const removeLinkHandler = (link, index) => {
    setLinksArray(
      linksArray.filter((l, i) =>
        l.id !== link.id || i !== index
      )
    );
  };

  const setPlatformHandler = (index, platform) => {
    linksArray[index] = {
      id: platform.id,
      background: platform.color
    };
    setLinksArray([...linksArray]);
    dropdownHandler(index);
  };

  const setLinkHandler = (index, link, target) => {
    linksArray[index] = {
      id: link.id,
      background: link.background,
      link: target
    };
    setLinksArray([...linksArray]);
  };

  const saveHandler = async() => {
    const stringifyArray = JSON.stringify(linksArray);
    try {
      const res = await update({
        id: userInfo.id,
        links: stringifyArray
      }).unwrap();
      dispatch(setCredentials( {...res} ));
    }
    catch(err) {
      console.log(err);
    }
  };

  return(
    <section id='links'>
      <Navbar />
      <div className='links__wrapper'>
        <div className='links__mockup'>
          <div className='links__mockup__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/illustration-phone-mockup.svg'} alt='mobile phone mockup'/>
            <div className='profile__mockup__image__data'>
              <div className='profile__mockup__image__data__image'>
                <img src={process.env.PUBLIC_URL + `assets/uploads/${userInfo.image}`} alt='avatar'/>
              </div>
              <div className='profile__mockup__image__data__details'>
                <h2>{userInfo.name} {userInfo.surname}</h2>
                <p>{userInfo.displayEmail}</p>
              </div>
            </div>
            <div className='links__mockup__links'>
              {linksArray.map((link, index) => (
                <a href={link.link} target="_blank" rel='noreferrer' key={index}>
                  <div style={{backgroundColor: link.background}} className='userlink__link'>
                    <div className='userlink__link__details'>
                      <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${link.id.toLowerCase().replace(' ', '-').replace('.', '')}.svg`} alt='link icon' />
                      <p>{link.id}</p>
                    </div>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/icon-arrow-right.svg'} alt='arrow right icon'/>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='links__info'>
          <div className='links__info__container'>
            <div className='links__info__header'>
              <h1>Customize your links</h1>
              <p>Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <div className='links__info__inner'>
              <button onClick={addLinkHandler}>+ Add new link</button>
              <div className='links__info__inner__list'>
                {(linksArray.length > 0) ? (
                  linksArray.map((link, index) => (
                    <div className='inputlink__wrapper' key={index}>
                      <div className='inputlink__container'>
                        <div className='inputlink__header'>
                          <div className='inputlink__header__number'>
                            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-drag-and-drop.svg'} alt='icon' />
                            <p>Link #{index + 1}</p>
                          </div>
                          <div className='inputlink__header__button'>
                            <button onClick={() => removeLinkHandler(link, index)}>Remove</button>
                          </div>
                        </div>
                        <div className='inputlink__platform'>
                          <p>Platform</p>
                          <div className='inputlink__platform__input'>
                            <div className='inputlink__platform__input__info'>
                              <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${link.id.toLowerCase().replace(' ', '-').replace('.', '')}.svg`} alt='link icon' />
                              <p>{link.id}</p>
                            </div>
                            <div className='inputlink__platform__input__button' onClick={() => dropdownHandler(index)}>
                              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-chevron-down.svg'} alt='dropdown icon' />
                            </div>
                          </div>
                          <div id={`platform-dropdown-${index}`} className='input__link__platform__dropdown'>
                            {platforms.map(platform => (
                              <div className='input__link__platform__dropdown__item__container' key={platform.color} >
                                <div className='input__link__platform__dropdown__item' onClick={() => setPlatformHandler(index, platform)}>
                                  <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${platform.id.toLowerCase().replace(' ', '-').replace('.', '')}.svg`} alt={`${platform.id.toLowerCase()} icon`} />
                                  <p>{platform.id}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='inputlink__link'>
                          <p>Link</p>
                          <div className='inputlink__link__info'>
                            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-link.svg'} alt='link icon'/>
                            <input
                            type='text'
                            placeholder='e.g. https://www.github.com/johnappleseed'
                            value={link.link ?? ''}
                            onChange={(e) => setLinkHandler(index, link, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='links__info__inner__list__empty'>
                    <img src={process.env.PUBLIC_URL + '/assets/images/illustration-empty.svg'} alt='mobile phone pic' />
                    <div className='links__info__inner__list__empty__info'>
                      <h2>Let's get you started</h2>
                      <p>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='links__info__footer'>
            <button onClick={saveHandler}>Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;
