import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useUpdateMutation } from '../../../redux/slices/usersApiSlice.js';
import { setCredentials } from '../../../redux/slices/authSlice.js';
import { gsap } from 'gsap';
import Navbar from '../../elements/Navbar/Navbar.jsx';
import Loading from '../../elements/Loading/Loading.jsx';
import './Links.scss';

const Links = () => {
  const dispatch = useDispatch();

  //  GSAP
  const linksRef = useRef(null);
  useLayoutEffect(() => {
    const links = linksRef.current;
    gsap.fromTo(links, {opacity: 0, x: '-2%'}, {opacity: 1, x: 0, duration: .5, ease: 'sine.out'});
  }, []);

  //  USER
  const { userInfo } = useSelector((state) => state.auth);
  const [update, { isLoading }] = useUpdateMutation();

  //  PLATFORMS
  const platforms = [
    {id: 'GitHub', color: '#1A1A1A'}, {id: 'Frontend Mentor', color: '#D9D9D9'}, {id: 'Twitter', color: '#43B7E9'}, {id: 'LinkedIn', color: '#2D68FF'}, {id: 'YouTube', color: '#EE3939'}, {id: 'Facebook', color: '#2442AC'}, {id: 'Twitch', color: '#EE3FC8'}, {id: 'Dev.to', color: '#333333'}, {id: 'Codewars', color: '#8A1A50'}, {id: 'freeCodeCamp', color: '#302267'}, {id: 'GitLab', color: '#EB4925'}, {id: 'Hashnode', color: '#0330D1'}, {id: 'Stack Overflow', color: '#EC7100'}
  ];

  //  IMAGE
  let image = process.env.PUBLIC_URL + '/assets/icons/icon-cloud.svg';
  if(userInfo.image !== undefined) {
    image = process.env.PUBLIC_URL + `assets/uploads/${userInfo.image}`;
  }

  //  LINKS
  const [linksArray, setLinksArray] = useState([]);
  useEffect(() => {
    if(userInfo.links) {
      setLinksArray(JSON.parse(userInfo.links));
    }
  }, [userInfo.links]);

  //  HANDLERS
  const dragLink = useRef(0);
  const draggedOverLink = useRef(0);
  const sortLinksHandler = () => {
    const linksArrayCopy = [...linksArray];
    const temp = linksArrayCopy[dragLink.current];
    linksArrayCopy[dragLink.current] = linksArrayCopy[draggedOverLink.current];
    linksArrayCopy[draggedOverLink.current] = temp;
    setLinksArray(linksArrayCopy);
  }

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

  const modalRef = useRef(null);
  const saveHandler = async() => {
    const modal = modalRef.current;
    const stringifyArray = JSON.stringify(linksArray);
    try {
      const res = await update({
        id: userInfo.id,
        links: stringifyArray
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

  return(
    <section id='links'>
      <Navbar />
      <div className='links__wrapper' ref={linksRef}>
        <div className='links__mockup'>
          <div className='links__mockup__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/illustration-phone-mockup.svg'} alt='mobile phone mockup'/>
            <div className='profile__mockup__image__data'>
              <div className='profile__mockup__image__data__image'>
                <img src={image} alt='avatar'/>
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
                    <div className='inputlink__wrapper' key={index}
                    draggable
                    onDragStart={() => (dragLink.current = index)}
                    onDragEnter={() => (draggedOverLink.current = index)}
                    onDragEnd={sortLinksHandler}
                    onDragOver={(e) => e.preventDefault()}
                    >
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
                              <div className='input__link__platform__dropdown__item__container' key={platform.id} >
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
                      <p>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. I'm here to help you share your profiles with everyone!</p>
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
        <div className='links__modal' ref={modalRef}>
          <div className='links__modal__container'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-changes-saved.svg'} alt='saved icon'/>
            <p>Your changes have been successfully saved!</p>
          </div>
        </div>
        {isLoading &&
          <Loading />
        }
      </div>
    </section>
  );
};

export default Links;
