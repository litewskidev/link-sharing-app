import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Sign from './components/Sign/Sign.jsx';
import Links from './components/Links/Links.jsx';
import Profile from './components/Profile/Profile.jsx';
import Preview from './components/Preview/Preview.jsx';
import E404 from './components/E404/E404.jsx';
import './styles/global.scss';

const App = () => {
  return(
    <main id='main'>
      <Routes>
        <Route exact path='/' element={ <Login /> } />
        <Route path='/signup' element={ <Sign /> } />
        <Route path='/links' element={ <Links />} />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/preview' element={ <Preview /> } />
        <Route path='*' element={ <E404 /> } />
      </Routes>
    </main>
  );
};

export default App
