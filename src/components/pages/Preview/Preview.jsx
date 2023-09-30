import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Preview.scss';
import UserLink from '../../elements/UserLink/UserLink';

const Preview = () => {
  const location = window.location.href;

  const { userInfo } = useSelector((state) => state.auth);

  let image = process.env.PUBLIC_URL + '/assets/icons/icon-cloud.svg';
  let linksArray = [];

  if(userInfo.image !== undefined) {
    image = userInfo.image;
  }
  if(userInfo.links !== undefined) {
    linksArray = JSON.parse(userInfo.links);
  }

  return(
    <section id='preview'>
      <div className='preview__wrapper'>
        <div className='preview__container'>
          <nav className='preview__navigation'>
            <Link to='/links' className='preview__navigation__back'>
              <button>Back to Editor</button>
            </Link>
            <div className='preview__navigation__share' onClick={() => {navigator.clipboard.writeText(location)}}>
              <button>Share Link</button>
            </div>
          </nav>
          <div className='preview__mockup'>
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
                {linksArray.map(link => (
                  <UserLink link={link.link} id={link.id} color={link.background} key={link.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='preview__underlay'></div>
      </div>
    </section>
  );
};

export default Preview;
