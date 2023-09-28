import { Outlet } from 'react-router-dom';
import './styles/global.scss';

const App = () => {
  return(
    <main id='main'>
      <Outlet />
    </main>
  );
};

export default App;
