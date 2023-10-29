import './Loading.scss';
import { DotLoader } from 'react-spinners';

const Loading = () => {
  return(
    <div className='loading__modal'>
      <DotLoader color="#BEADFF" size={40} />
    </div>
  );
};

export default Loading;
