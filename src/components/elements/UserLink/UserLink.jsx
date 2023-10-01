import './UserLink.scss';

const UserLink = ({ link, id, color }) => {
  return(
    <a href={link} target="_blank" rel='noreferrer'>
      <div style={{backgroundColor: color}} className='userlink__link'>
        <div className='userlink__link__details'>
          <img src={process.env.PUBLIC_URL + `/assets/icons/icon-${id.toLowerCase().replace(' ', '-').replace('.', '')}.svg`} alt='link icon' />
          <p>{id}</p>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/icons/icon-arrow-right.svg'} alt='arrow right icon'/>
      </div>
    </a>
  );
};

export default UserLink;
