import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableLink = ({ linksArray, setLinksArray, id, link, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

    //  PLATFORMS
  const platforms = [
    {id: 'GitHub', color: '#1A1A1A'}, {id: 'Frontend Mentor', color: '#D9D9D9'}, {id: 'Twitter', color: '#43B7E9'}, {id: 'LinkedIn', color: '#2D68FF'}, {id: 'YouTube', color: '#EE3939'}, {id: 'Facebook', color: '#2442AC'}, {id: 'Twitch', color: '#EE3FC8'}, {id: 'Dev.to', color: '#333333'}, {id: 'Codewars', color: '#8A1A50'}, {id: 'freeCodeCamp', color: '#302267'}, {id: 'GitLab', color: '#EB4925'}, {id: 'Hashnode', color: '#0330D1'}, {id: 'Stack Overflow', color: '#EC7100'}
  ];

  const dropdownHandler = (index) => {
    const dropdown = document.querySelector(`#platform-dropdown-${index}`);
    dropdown.classList.toggle('show');
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

  return(
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
    </div>
  );
};

export default SortableLink;
