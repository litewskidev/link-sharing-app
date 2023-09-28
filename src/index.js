import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './App.js';
import Links from './components/Links/Links.jsx';
import Profile from './components/Profile/Profile.jsx';
import Preview from './components/Preview/Preview.jsx';
import Login from './components/Login/Login.jsx';
import Sign from './components/Register/Register.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <Links /> } />
      <Route path='/profile' element={ <Profile /> } />
      <Route path='/preview' element={ <Preview /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Sign /> } />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  //</React.StrictMode>
);
