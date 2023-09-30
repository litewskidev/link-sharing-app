import { useState } from 'react';
import './InputLink.scss';

const InputLink = ({ id }) => {

  const [linkId, setLinkId] = useState('GitHub');

  return(
    <div className='inputlink__wrapper'>
      <div className='inputlink__container'>
        <div className='inputlink__header'>
          <div className='inputlink__header__number'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-drag-and-drop.svg'} alt='icon' />
            <p>Link #</p>
          </div>
          <div className='inputlink__header__button'>
            <button>Remove</button>
          </div>
        </div>
        <div className='inputlink__platform'>
          <p>Platform</p>
          <div className='inputlink__platform__input'>
            <div className='inputlink__platform__input__info'>
              <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${id.toLowerCase()}.svg`} alt='link icon' />
              <p>{id}</p>
            </div>
            <div className='inputlink__platform__input__button'>
              <img src={process.env.PUBLIC_URL + '/assets/icons/icon-chevron-down.svg'} alt='dropdown icon' />
            </div>
          </div>
          <div id='platform-dropdown' className='input__link__platform__dropdown'>

          </div>
        </div>
        <div className='inputlink__link'>
          <p>Link</p>
          <div className='inputlink__link__info'>
            <img src={process.env.PUBLIC_URL + '/assets/icons/icon-link.svg'} alt='link icon'/>
            <input
            type='text'
            placeholder='e.g. https://www.github.com/johnappleseed'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputLink;
