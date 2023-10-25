import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './App.js';
import Home from './components/pages/Home/Home.jsx';
import Login from './components/pages/Login/Login.jsx';
import Sign from './components/pages/Register/Register.jsx';
import E404 from './components/pages/E404/E404.jsx';
import Links from './components/pages/Links/Links.jsx';
import Profile from './components/pages/Profile/Profile.jsx';
import Preview from './components/pages/Preview/Preview.jsx';
import PrivateRoute from './components/elements/PrivateRoute/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <Home /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Sign /> } />
      <Route path='*' element={ <E404 /> } />
      {/* PRIVATE ROUTES */}
      <Route path='' element={ <PrivateRoute /> }>
        <Route path='/links' element={ <Links /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/preview' element={ <Preview /> } />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>
);
