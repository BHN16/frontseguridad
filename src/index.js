import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
  </BrowserRouter>
);
