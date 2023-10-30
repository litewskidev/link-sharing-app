import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import UserLink from '../../elements/UserLink/UserLink.jsx';
import './Preview.scss';

const Preview = () => {
  //  GSAP
  const previewWrapperRef = useRef(null);
  const previewRef = useRef(null);
  useLayoutEffect(() => {
    const previewWrapper = previewWrapperRef.current;
    const preview = previewRef.current;
    gsap.fromTo(previewWrapper, {opacity: 0}, {opacity: 1, duration: .5, ease: 'sine.out'});
    gsap.fromTo(preview, {x: '-2%'}, {x: 0, duration: .5, ease: 'sine.out'});
  }, []);

  //  USER
  const { userInfo } = useSelector((state) => state.auth);

  //  IMAGE
  let image = process.env.PUBLIC_URL + '/assets/icons/icon-cloud.svg';
  if(userInfo.image !== undefined) {
    image = process.env.PUBLIC_URL + `assets/uploads/${userInfo.image}`;
  }

  //  LINKS
  let linksArray = [];
  if(userInfo.links !== undefined) {
    linksArray = JSON.parse(userInfo.links);
  }

  //  CLIPBOARD
  const modalRef = useRef(null);
  const clipboard = window.location.origin + '/' + userInfo.id;
  const clipboardHandle = () => {
    navigator.clipboard.writeText(clipboard);
    const modal = modalRef.current;
    modal.classList.add('show');
    setTimeout(() => {
      modal.classList.remove('show');
    }, 3500);
  };

  return(
    <section id='preview'>
      <div className='preview__wrapper' ref={previewWrapperRef}>
        <div className='preview__container'>
          <nav className='preview__navigation'>
            <Link to='/links' className='preview__navigation__back'>
              <button>Back to Editor</button>
            </Link>
            <div className='preview__navigation__share' onClick={clipboardHandle}>
              <button>Share Link</button>
            </div>
          </nav>
          <div className='preview__mockup' ref={previewRef}>
            <div className='preview__mockup__inner'>
              <div className='preview__mockup__inner__info'>
                <div className='preview__mockup__inner__info__image'>
                  <div className='preview__mockup__inner__info__image__inner'>
                    <img src={image} alt='avatar'/>
                  </div>
                </div>
                <div className='preview__mockup__inner__info__details'>
                  <h1>{userInfo.name} {userInfo.surname}</h1>
                  <p>{userInfo.displayEmail}</p>
                </div>
              </div>
              <div className='preview__mockup__inner__links'>
                {linksArray.map((link, index) => (
                  <UserLink link={link.link} id={link.id} color={link.background} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div id='preview-modal' className='preview__modal' ref={modalRef}>
            <div className='preview__modal__container'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-link.svg'} alt='link icon'/>
              <p>The link has been copied to your clipboard!</p>
            </div>
          </div>
        </div>
        <div className='preview__underlay'></div>
      </div>
    </section>
  );
};

export default Preview;
