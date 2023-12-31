import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import UserLink from '../../elements/UserLink/UserLink.jsx';
import Loading from '../../elements/Loading/Loading.jsx';
import './ShareLink.scss';

const ShareLink = () => {
  const navigate = useNavigate();

  //  GSAP
  const previewWrapperRef = useRef(null);
  const previewRef = useRef(null);
  useLayoutEffect(() => {
    const previewWrapper = previewWrapperRef.current;
    const preview = previewRef.current;
    gsap.fromTo(previewWrapper, {opacity: 0}, {opacity: 1, duration: .5, ease: 'sine.out'});
    gsap.fromTo(preview, {x: '-2%'}, {x: 0, duration: .5, ease: 'sine.out'});
  }, []);

  //  PROFILE
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:7777/api/users/${id}`).then((res) => {
      setProfile(res.data);
      setIsLoading(false);
    }).catch((err) => {
      navigate('*');
    });
  }, [id, navigate]);

  //  IMAGE
  let image = process.env.PUBLIC_URL + '/assets/icons/icon-cloud.svg';
  if(profile.image !== undefined) {
    image = process.env.PUBLIC_URL + `assets/uploads/${profile.image}`;
  }

  //  LINKS
  let linksArray = [];
  if(profile.links !== undefined) {
    linksArray = JSON.parse(profile.links);
  }

  return(
    <section id='share-link'>
      <div className='preview__wrapper' ref={previewWrapperRef}>
        <div className='sharelink__container'>
          <div className='preview__mockup' ref={previewRef}>
            <div className='preview__mockup__inner'>
              <div className='preview__mockup__inner__info'>
                <div className='preview__mockup__inner__info__image'>
                  <div className='preview__mockup__inner__info__image__inner'>
                    <img src={image} alt='avatar'/>
                  </div>
                </div>
                <div className='preview__mockup__inner__info__details'>
                  <h1>{profile.name} {profile.surname}</h1>
                  <p>{profile.displayEmail}</p>
                </div>
              </div>
              <div className='preview__mockup__inner__links'>
                {linksArray.map((link, index) => (
                  <UserLink link={link.link} id={link.id} color={link.background} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='preview__underlay'></div>
        {isLoading &&
          <Loading />
        }
      </div>
    </section>
  );
};

export default ShareLink;
