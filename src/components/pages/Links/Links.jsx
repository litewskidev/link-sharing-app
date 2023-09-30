import { useSelector } from 'react-redux';
import Navbar from '../../elements/Navbar/Navbar.jsx';
import './Links.scss';
import UserLink from '../../elements/UserLink/UserLink.jsx';
import InputLink from '../../elements/InputLink/InputLink.jsx';

const Links = () => {
  const { userInfo } = useSelector((state) => state.auth);

  let linksArray = [];
  if(userInfo.links !== undefined) {
    linksArray = JSON.parse(userInfo.links);
  }

  return(
    <section id='links'>
      <Navbar />
      <div className='links__wrapper'>
        <div className='links__mockup'>
          <div className='links__mockup__image'>
            <img src={process.env.PUBLIC_URL + '/assets/images/illustration-phone-mockup.svg'} alt='mobile phone mockup'/>
            <div className='links__mockup__links'>
              {linksArray.map(link => (
                <UserLink link={link.link} id={link.id} color={link.background} key={link.id} />
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
              <button>+ Add new link</button>
              <div className='links__info__inner__list'>
                {(linksArray.length > 0) ? (
                  linksArray.map(link => (
                    <InputLink key={link.id} id={link.id}/>
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
            <button>Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;
