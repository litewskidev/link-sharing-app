import { Link } from 'react-router-dom';
import './Preview.scss';

const Preview = () => {
  const location = window.location.href;

  const testInfo = {
    name: 'Cat Benjamin',
    email: 'ben@example.com',
    image: 'https://i.postimg.cc/dVPbSFvY/cat.webp',
    links: [
      {
        id: 'GitHub',
        background: '#1A1A1A',
        link: 'https://github.com'
      },
      {
        id: 'YouTube',
        background: '#EE3939',
        link: 'https://www.youtube.com'
      },
      {
        id: 'LinkedIn',
        background: '#2D68FF',
        link: 'https://www.linkedin.com'
      }
    ]
  };

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
                    <img src={testInfo.image} alt='avatar'/>
                  </div>
                </div>
                <div className='preview__mockup__inner__info__details'>
                  <h1>{testInfo.name}</h1>
                  <p>{testInfo.email}</p>
                </div>
              </div>
              <div className='preview__mockup__inner__links'>
                {testInfo.links.map(link => (
                  <a href={link.link} target="_blank" rel='noreferrer' key={link.id}>
                    <div style={{backgroundColor: link.background}} className='preview__mockup__inner__links__link'>
                      <div className='preview__mockup__inner__links__link__details'>
                        <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${link.id.toLowerCase()}.svg`} alt='link icon' />
                        <p>{link.id}</p>
                      </div>
                      <img src={process.env.PUBLIC_URL + '/assets/icons/icon-arrow-right.svg'} alt='arrow right icon'/>
                    </div>
                  </a>
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

export default Preview
