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
import E404 from './components/E404/E404.jsx'
import Home from './components/Home/Home.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

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
  //<React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  //</React.StrictMode>
);
